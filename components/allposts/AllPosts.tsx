import React from "react";
import AddPost from "./actions/AddPost";

interface Post {
  title: string;
  slug: string;
  id: string;
  body: string;
}

const AllPosts = ({ posts }) => {
  return (
    <main className="pt-20">
      <AddPost />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 lg:gap-9">
        {posts?.map((post: Post) => (
          <main
            key={post?.id}
            className="border border-gray-600 rounded-lg shadow p-4 flex flex-col items-center"
          >
            <h4 className="text-sm">{post?.title}</h4>
            <p className="text-xs">{post?.body}</p>
          </main>
        ))}
      </div>
    </main>
  );
};

export default AllPosts;
