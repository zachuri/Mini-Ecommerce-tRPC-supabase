import React from "react";
import { api } from "~/utils/api";
import Image from "next/image";

const FetchProduct = () => {
  const getProducts = api.product.getProducts.useQuery();

  return (
    <div className="mx-10 grid grid-cols-3 gap-5 text-2xl max-md:grid max-md:grid-cols-2">
      {getProducts.data?.allProducts?.map((product, index) => {
        return (
          <div key={index} className="flex flex-col ">
            <div className="relative h-[150px] w-[150px] md:h-[200px] md:w-[200px]">
              <Image
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                src={product.image_url}
                fill
                style={{ objectFit: "cover" }}
                alt={"overlay"}
              />
            </div>
            <div className="my-5 flex flex-row items-start justify-between text-sm">
              <p>{product.name}</p>
              <p>${product.price}</p>
              {/* <p>{product.description}</p> */}
              {/* <p>{product.category}</p> */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FetchProduct;
