import { useUser, useSupabaseClient } from "@supabase/auth-helpers-react";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import {
  createServerSupabaseClient,
  User,
} from "@supabase/auth-helpers-nextjs";
import { type GetServerSidePropsContext } from "next";
import { type ChangeEvent, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import AuthPage from "./auth";

// export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
//   // Create authenticated Supabase Client
//   const supabase = createServerSupabaseClient(ctx);
//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession();

//   if (!session)
//     return {
//       redirect: {
//         destination: "/auth",
//         permanent: false,
//       },
//     };

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//     },
//   };
// };

const CreateArticle: NextPage = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const initialState = {
    title: "",
    content: "",
  };

  const [postData, setPostData] = useState(initialState);

  // Handle change any to make it any input type
  const handleChange = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    setPostData({ ...postData, [e.target.name]: e.target.value });
    console.log(postData);
  };

  const createPost = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_posts")
        .insert([
          {
            title: postData.title,
            content: postData.content,
            user_email: user?.email?.toLocaleLowerCase(),
            user_id: user?.id,
          },
        ])
        .single();
      if (error) throw error;
      setPostData(initialState);
      void router.push("/");
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(error.message);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl">Title</h1>
          <input
            name="title"
            className="rounded-xl border p-5"
            placeholder="Title"
            onChange={handleChange}
          />
          <h1 className="text-4xl">Content</h1>
          <textarea
            name="content"
            className="rounded-xl border p-5"
            placeholder="Content"
            onChange={handleChange}
          />
          <p>Posting as {user?.email}</p>
          <button
            className="rounded-xl border bg-blue-600 p-2 text-white"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={createPost}
          >
            Create Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateArticle;
