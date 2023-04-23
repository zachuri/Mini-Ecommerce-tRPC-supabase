import React, { useEffect } from "react";
import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import Link from "next/link";

const Navbar = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();

  return (
    <>
      <div className="fixed top-0 z-[100] h-16 w-full border-b bg-opacity-20 drop-shadow-lg backdrop-blur-lg md:h-20">
        <div className="grid h-full grid-cols-4">
          <div className="flex items-center justify-center">
            <Link href={"/"}>Website</Link>
          </div>
          <div className="col-span-2 flex items-center justify-center gap-2"></div>
          <div className="flex items-center justify-center">
            {!user ? (
              <Link href={"/auth"}>
                <div className="rounded-xl p-2">Login</div>
              </Link>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <div>
                  <button
                    className="rounded-xl p-2"
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
