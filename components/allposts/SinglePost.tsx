import React, { ReactNode } from "react";
import { Post, SinglePostProps } from "../../utils/types";
import Update from "./actions/Update";

const SinglePost: React.FC<SinglePostProps> = ({ post }: { post: Post }) => {
  return (
    <main className="border border-gray-600 rounded-lg shadow p-4 flex flex-col items-center">
      <h4 className="text-sm">{post?.title}</h4>
      <p className="text-xs">{post?.body}</p>
      <div>
        <Update post={post} />
      </div>
    </main>
  );
};

export default SinglePost;
