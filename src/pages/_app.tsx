import "~/styles/globals.css";
import { useState } from "react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import {
  SessionContextProvider,
  type Session,
} from "@supabase/auth-helpers-react";
import { api } from "~/utils/api";

import { type AppProps } from "next/app";
// import Navbar from "~/components/navbar";

// const MyApp: AppType = ({ Component, pageProps }) => {
//   return <Component {...pageProps} />;
// };

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  // Create a new supabase browser client on every first render.
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      {/* <Navbar /> */}
      <Component {...pageProps} />
    </SessionContextProvider>
  );
}

export default api.withTRPC(MyApp);
