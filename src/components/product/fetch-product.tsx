import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const FetchProduct = () => {
  const getProducts = api.product.getProducts.useQuery();

  return (
    <div className="text-2xl text-white">
      {getProducts.data?.allProducts?.map((product, index) => {
        return (
          <div
            key={index}
            className="mt-2 flex flex-row items-center justify-between border"
          >
            <div>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.category}</p>
            </div>
            <div className="relative h-[300px] md:h-[200px] md:w-[400px] ">
              <Image
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={product.image_url}
                fill
                style={{ objectFit: "cover" }}
                alt={"overlay"}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FetchProduct;
