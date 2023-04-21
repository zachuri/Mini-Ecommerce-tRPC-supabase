import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { supabase } from "../../../utils/supabase-client";

export const productRouter = createTRPCRouter({
  getProducts: publicProcedure
    // .input(z.object({ text: z.number() }))
    .query(async () => {
      const products = await supabase
        .from("products")
        .select("*")
        .limit(10)
        .order("id", { ascending: true });

      // async () => {
      //   try {
      //     const { data, error } = await supabase
      //       .from("products")
      //       .select("*")
      //       .limit(10)
      //       .order("id", { ascending: true });

      //     if (error) throw error;
      //     console.log(data);
      //     if (data != null) {
      //       console.log(data);
      //       return { allProducts: data };
      //     }
      //   } catch (error: any) {
      //     // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      //     console.log(error.message);
      //   }
      // };

      return { allProducts: products.data };
    }),
});