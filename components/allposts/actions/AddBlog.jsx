import React from "react";
import { createBlog } from "./server-actions/actions";

const AddBlog = () => {
  return (
    <div>
      <h4 className="my-20 text-center">Create Blog</h4>
      {/* <p>{state?.message}</p> */}
      <form
        action={createBlog}
        className="flex flex-col gap-2 max-w-screen-sm mx-auto"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="bg-transparent  border border-gray-600 px-3 py-1 rounded-md"
          id=""
        />
        <textarea
          name="content"
          id=""
          placeholder="Write your content"
          cols="30"
          rows="10"
          className="bg-transparent  border border-gray-600 px-3 py-1 rounded-md"
        ></textarea>

        <button
          type="submit"
          className="py-2 w-full border bg-gray-700 rounded-md"
        >
          create
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
