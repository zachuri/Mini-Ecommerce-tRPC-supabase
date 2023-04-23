import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const FetchProduct = () => {
  const getProducts = api.product.getProducts.useQuery();

  return (
    <div className="flex flex-col gap-5 text-2xl">
      {getProducts.data?.allProducts?.map((product, index) => {
        return (
          <div
            key={index}
            className="flex flex-row items-center justify-between border border-black"
          >
            <div>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>{product.price}</p>
              <p>{product.category}</p>
            </div>
            <div className="relative h-[200px] w-[200px]">
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
