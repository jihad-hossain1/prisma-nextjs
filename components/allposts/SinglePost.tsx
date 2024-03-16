import React, { ReactNode } from "react";
import { Post, SinglePostProps } from "../../utils/types";
import Update from "./actions/Update";
import DeletePost from "./actions/DeletePost";

const SinglePost: React.FC<SinglePostProps> = ({ post }: { post: Post }) => {
  return (
    <main className="group relative border border-gray-600 rounded-lg shadow p-4 flex flex-col items-center">
      <h4 className="text-sm">{post?.title}</h4>
      <p className="text-xs">{post?.body}</p>
      <div className="absolute  z-50 hidden group-hover:flex items-center gap-2 ">
        <Update post={post} />
        <DeletePost id={post?.id} userId={post?.userId} />
      </div>
    </main>
  );
};

export default SinglePost;
