/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UserPosts = () => {
  const supabaseClient = useSupabaseClient();
  const user = useUser();
  const router = useRouter();
  const [posts, setPosts] = useState<{ [x: string]: any }[]>();

  useEffect(() => {
    void getUserPosts();
  }, []);

  const getUserPosts = async () => {
    try {
      const { data, error } = await supabaseClient
        .from("user_posts")
        .select("*")
        .limit(10);
      if (error) throw error;
      console.log(data);
      if (data != null) {
        setPosts(data);
      }
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      alert(error.message);
    }
  };

  return (
    <>
      <h1>Main Feed</h1>
      <h2>Check out posts form users here</h2>
      <>
        {posts?.map((post) => {
          return (
            <>
              <div key={post.id}>
                <div className="rounded-xl border hover:border-black">
                  <p>Title: {post.title}</p>
                  <p>Content {post.content}</p>
                </div>
              </div>
            </>
          );
        })}
      </>
    </>
  );
};

export default UserPosts;
