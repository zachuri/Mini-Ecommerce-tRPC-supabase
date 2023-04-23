import { useUser } from "@supabase/auth-helpers-react";
import React, { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

interface ProductProps {
  inventory: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

const CreateProduct = () => {
  const ctx = api.useContext();
  const getUser = api.user.account.useQuery();
  const user = useUser();

  const { mutate } = api.product.addProducts.useMutation({
    onSuccess: () => {
      setProductData(initialState);
      void ctx.product.getProducts.invalidate();
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

  const initialState = {
    inventory: 0,
    name: "",
    description: "",
    price: 0.0,
    category: "",
    image_url: "",
  };

  const [productData, setProductData] = useState<ProductProps>(initialState);

  // Handle change any to make it any input type
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    const newValue = type === "number" ? Number(value) : value;

    setProductData((prevState) => ({ ...prevState, [name]: newValue }));

    console.log(productData);
  };

  return (
    <>
      {getUser.data?.userData.role == "admin" && user ? (
        <>
          <div className="flex items-center justify-center">
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl">Inventory</h1>
              <input
                name="inventory"
                className="rounded-xl border p-5"
                placeholder="Inventory"
                onChange={handleChange}
                type="number"
              />
              <h1 className="text-4xl">Name</h1>
              <input
                name="name"
                className="rounded-xl border p-5"
                placeholder="Name"
                onChange={handleChange}
              />
              <h1 className="text-4xl">Description</h1>
              <textarea
                name="description"
                className="rounded-xl border p-5"
                placeholder="Description"
                onChange={handleChange}
              />
              <h1 className="text-4xl">Price</h1>
              <input
                name="price"
                className="rounded-xl border p-5"
                placeholder="Price"
                onChange={handleChange}
                type="number"
              />
              <h1 className="text-4xl">Category</h1>
              <input
                name="category"
                className="rounded-xl border p-5"
                placeholder="Category"
                onChange={handleChange}
              />
              <h1 className="text-4xl">Image URL</h1>
              <input
                name="image_url"
                className="rounded-xl border p-5"
                placeholder="Image URL"
                onChange={handleChange}
              />
              <p>Posting as {user?.email}</p>
              <button
                className="rounded-xl border bg-blue-600 p-2 text-white"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => {
                  // mutate({ title: productData.title, content: productData.content });
                  mutate({
                    inventory: productData.inventory,
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    category: productData.category,
                    image_url: productData.image_url,
                  });
                }}
              >
                Create Post
              </button>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CreateProduct;
