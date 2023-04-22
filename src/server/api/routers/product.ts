import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

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
        title: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
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
