"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Post, User } from "../../utils/types";
import SinglePost from "../allposts/SinglePost";

interface UserProfileProps {
  userData: User;
}

const UserProfile: React.FC<UserProfileProps> = ({ userData }) => {
  const { status, data: session } = useSession();

  if (status === "unauthenticated") {
    return <NotAllow />;
  }
  return (
    <div>
      {status === "authenticated" && (
        <>
          <div className="mt-4 flex flex-col gap-1">
            <h4 className="text-xl font-semibold">
              Name: <span className="font-[300]">{session?.user?.name}</span>
            </h4>
            <h4 className="text-xl font-semibold">
              Email: <span className="font-[300]">{session?.user?.email}</span>
            </h4>
            <h4 className="text-xl font-semibold">
              Role: <span className="font-[300]">{session?.user?.role}</span>
            </h4>
          </div>

          <div>
            <h4>total-post: {userData?.posts?.length || 0}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {userData?.posts?.map((post: Post) => (
                <SinglePost key={post?.id} post={post} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

function NotAllow() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[70vh]">
      <div className="text-center flex flex-col gap-3 items-center">
        <h4 className="text-xl uppercase">You are not allow</h4>
        <Link
          href={"/login"}
          className="border border-gray-700 px-3 rounded-md w-fit bg-violet-800 py-1 shadow-sm hover:shadow"
        >
          Login First
        </Link>
      </div>
    </div>
  );
}

export default UserProfile;
