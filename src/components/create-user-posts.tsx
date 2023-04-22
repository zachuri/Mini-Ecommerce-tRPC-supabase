import { useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

const CreateUserPost = () => {
  const { mutate } = api.product.addUserPosts.useMutation({
    onSuccess: () => {
      setPostData(initialState);
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post! Please try again later.");
      }
    },
  });

  const user = useUser();

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
            onClick={() => {
              // mutate({ title: postData.title, content: postData.content });
              mutate({
                title: postData.title,
                content: postData.content,
              });
            }}
          >
            Create Post
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateUserPost;
