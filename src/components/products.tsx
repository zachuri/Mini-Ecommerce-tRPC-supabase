/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Products = () => {
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<{ [x: string]: any }[]>();

  useEffect(() => {
    void getProducts();
  }, []);

  const getProducts = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("products")
        .select("*")
        .limit(10)
        .order("id", { ascending: true });

      if (error) throw error;
      console.log(data);
      if (data != null) {
        setProducts(data);
        setIsLoading(false);
        console.log(products);
      }
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Products Feed</h1>
      {isLoading ? (
        <>isLoading</>
      ) : (
        <>
          {products?.map((product) => {
            return (
              <>
                <div key={product.id}>
                  <div className="rounded-xl border hover:border-black">
                    <p>Name: {product.name}</p>
                    <p>Description: {product.description}</p>
                    <p>Price: ${product.price}</p>
                    <p>Category: {product.category}</p>
                    <p>Inventory: {product.inventory}</p>
                    <div className="relative h-[300px] md:h-[400px] md:w-[600px] xl:h-[500px] xl:w-[650px]">
                      <Image
                        src={product.image_url}
                        fill
                        style={{ objectFit: "cover" }}
                        alt={"overlay"}
                      />
                    </div>
                  </div>
                </div>
              </>
            );
          })}
        </>
      )}
    </>
  );
};

export default Products;
