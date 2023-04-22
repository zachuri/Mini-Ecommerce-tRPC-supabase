import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  account: publicProcedure
    // .input(z.object({ text: z.number() }))
    .query(async ({ ctx }) => {
      if (ctx.session?.user) {
        try {
          const { data, error } = await ctx.supabaseClient
            .from("profiles")
            .select("username, website, full_name, avatar_url, website, role")
            .eq("id", ctx.session?.user.id)
            .limit(1)
            .single();

          if (error) {
            throw error;
          }

          return { userData: data };
        } catch (error: any) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          console.log(error);
        }
      } else {
        console.error("MUST BE SIGNED IN/ ADMIN");
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `User must be an signed in/ admin to add to products table`,
        });
      }
    }),
});
