import { SupabaseClient } from "@supabase/supabase-js";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure
    // .input(z.object({ text: z.number() }))
    .query(async ({ ctx }) => {
      try {
        const { data, error } = await ctx.supabaseClient
          .from("products")
          .select("*")
          .limit(10)
          .order("id", { ascending: true });

        if (error) throw error;

        if (data) {
          return {
            allProducts: data,
          };
        }
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error.message);
      }
    }),
  addProducts: publicProcedure
    .input(
      z.object({
        inventory: z.number(),
        name: z.string(),
        description: z.string(),
        price: z.number(),
        category: z.string(),
        image_url: z.string().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data: user } = await ctx.supabaseClient
        .from("profile")
        .select("role")
        .eq("user_id", ctx.session?.user.id)
        .limit(1)
        .single();

      // if (user) {
      try {
        const { data, error } = await ctx.supabaseClient
          .from("products")
          .insert([
            {
              inventory: input.inventory,
              name: input.name,
              description: input.description,
              price: input.price,
              category: input.category,
              image_url: input.image_url,
            },
          ])
          .single();
        if (error) throw error;
        return data;
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error);
      }
      // }
      // else {
      //   console.error("MUST BE AN ADMIN");
      //   throw new TRPCError({
      //     code: "INTERNAL_SERVER_ERROR",
      //     message: `User must be an admin to add to products table`,
      //   });
      // }
    }),
  addUserPosts: publicProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      console.log(ctx.session?.user.role);
      try {
        const { data, error } = await ctx.supabaseClient
          .from("user_posts")
          .insert([
            {
              title: input.title,
              content: input.content,
              user_email: ctx.session?.user.email?.toLocaleLowerCase(),
              user_id: ctx.session?.user.id,
            },
          ])
          .single();
        if (error) throw error;
        return data;
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        console.log(error);
      }
    }),
});
