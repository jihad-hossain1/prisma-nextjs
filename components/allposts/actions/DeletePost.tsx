"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";

interface Props {
  userId: string;
  id: string;
}

const DeletePost: React.FC<Props> = ({ id, userId }) => {
  const { status, data: session } = useSession();
  const router = useRouter();

  // handle delete function
  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/v1/posts/${id}`, {
        method: "DELETE",
        body: JSON.stringify({
          userId: session?.user?.id,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        console.log(res);
        alert("post delete not working");
      }

      alert("post delete done");
      router.refresh();
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      {status === "authenticated" && session?.user?.id == userId && (
        <button
          onClick={handleDelete}
          className="bg-red-500 text-zinc-50 w-full px-2 py-1 rounded-md shadow-sm text-sm"
        >
          Delete
        </button>
      )}
    </>
  );
};

export default DeletePost;
