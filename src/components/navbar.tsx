import React, { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  // useEffect(() => {
  //   const checkSession = async () => {
  //     const { data } = await supabaseClient.auth.getSession();
  //     if (data.session) {
  //       void router.back();
  //     }
  //   };

  //   void checkSession();
  // });

  // supabaseClient.auth.onAuthStateChange((event) => {
  //   if (event == "SIGNED_OUT") {
  //     void router.push("/");
  //   }
  // });

  return (
    <>
      <div className="border border-black p-5 ">
        <div className="grid grid-cols-3">
          <div className="flex items-center justify-center border">
            <Link href={"/"}>Website</Link>
          </div>
          <div className="flex items-center justify-center gap-2 border">
            <a href={"/"}>Main Page</a>
            <a href={"/createArticle"}>Create Article</a>
            <a href={"/account"}>Account</a>
          </div>
          <div className="flex items-center justify-center border">
            {!user ? (
              <Link href={"/auth"}>
                <div className="rounded-xl border p-2">Login</div>
              </Link>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div>Hey, {user.email}</div>
                <div>
                  <button
                    className="rounded-xl border p-2"
                    onClick={() => {
                      void supabaseClient.auth.signOut();
                      void router.push("/");
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
