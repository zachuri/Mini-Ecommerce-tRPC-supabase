import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { api } from "~/utils/api";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import CreateProduct from "~/components/create-product";
import CreateUserPost from "~/components/create-user-posts";

const Home: NextPage = () => {
  const getProducts = api.product.getProducts.useQuery();
  const getUser = api.user.account.useQuery();

  useEffect(() => {
    getProducts;
    getUser;
  }, []);


  return (
    <>
      <Head>
        <title>Mini-Ecommerce</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        {getUser.data?.userData.role == "admin" ? (
          <>
            <div>
              {/* <CreateUserPost /> */}
              <CreateProduct />
            </div>
          </>
        ) : (
          <></>
        )}

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
      </main>
    </>
  );
};

export default Home;
