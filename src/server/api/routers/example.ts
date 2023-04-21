import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.number() }))
    .query(({ input }) => {
      const total = input.text * input.text;

      return {
        greeting: `Hello ${total}`,
      };
    }),
});
