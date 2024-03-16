"use client";

import React, { useState, ChangeEvent, FormEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaUser, FaUserLock } from "react-icons/fa";
import Modal from "../../modal/Modal";
import { SinglePostProps } from "../../../utils/types";

const Update: React.FC<SinglePostProps> = ({ post }) => {
  const { status, data: session } = useSession();
  const router = useRouter();


  const [openModal, setOpenModal] = useState(false);

  const [formdata, setformdata] = useState({
    title: post?.title,
    body: post?.body,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setformdata((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlesubmit = async (e: any) => {
    e.preventDefault();
    if (!session?.user) {
      return alert("user must be required");
    }

    try {
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          body: formdata.body,
          title: formdata.title,
        }),
      };
      const res = await fetch(`/api/v1/posts/${post?.id}`, requestOptions);
      console.log(res);
      if (res?.status == 200) {
        router.refresh();
        // alert("post create successfull");
        setOpenModal(false);
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <>
      {" "}
      {status === "authenticated" && session?.user?.id == post?.userId && (
        <button
          onClick={() => setOpenModal(true)}
          className="bg-violet-800 rounded shadow px-2 py-1 my-4 w-full"
        >
          update
        </button>
      )}
      <Modal
        openModal={openModal}
        setOpenModal={setOpenModal}
        title={"Create a Post"}
      >
        <form className="p-12" onSubmit={handlesubmit}>
          <div className="space-y-5">
            <div className="relative">
              <input
                onChange={handleChange}
                value={formdata.title}
                id="title"
                name="title"
                type="text"
                placeholder="title"
                className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none  bg-transparent text-gray-50 border border-violet-400"
              />
              <span className="absolute top-1/4 left-2">
                <FaUser className="text-gray-500" size={23} />
              </span>
            </div>
            <div className="relative">
              <input
                onChange={handleChange}
                value={formdata.body}
                id="content"
                type="text"
                name="body"
                placeholder="Content"
                className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none  bg-transparent text-gray-50 border border-violet-400"
              />
              <span className="absolute top-1/4 left-2">
                <FaUser className="text-gray-500" size={23} />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 w-full py-2 bg-violet-600 text-white px-3 shadow rounded"
          >
            update
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Update;
