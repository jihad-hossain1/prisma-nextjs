'use client'

import React from "react";
import AddPost from "./actions/AddPost";
import SinglePost from "./SinglePost";
import { Post, Props } from "../../utils/types";
import { useSession } from "next-auth/react";




const AllPosts: React.FC<Props> = ({ posts }) => {
  const { data } = useSession();
  console.log(data)
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
