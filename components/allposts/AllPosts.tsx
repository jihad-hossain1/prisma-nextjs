import React from "react";
import AddPost from "./actions/AddPost";
import SinglePost from "./SinglePost";
import { Post, Props } from "../../utils/types";
// import { Post } from "@prisma/client";



const AllPosts: React.FC<Props> = ({ posts }) => {
  return (
    <main className="pt-20">
      <AddPost />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-7 lg:gap-9">
        {posts?.map((post: Post) => (
          <SinglePost key={post?.id} post={post} />
        ))}
      </div>
    </main>
  );
};





export default AllPosts;
