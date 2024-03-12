"use client";

import React, { useState, ChangeEvent, FormEventHandler } from "react";
import { FaUser, FaUserLock } from "react-icons/fa";
import Modal from "../../modal/Modal";
import { useRouter } from "next/navigation";

const AddPost = () => {
  const router = useRouter();

  const user = {
    id: "cltnp73j10000dzxrapq4ozml",
  };
  const [openModal, setOpenModal] = useState(false);

  const [formdata, setformdata] = useState({
    title: "",
    body: "",
    slug: "",
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

    console.log({
      userId: user.id,
      slug: formdata.slug,
      body: formdata.body,
      title: formdata.title,
    });

    if (!user) {
      return alert("user must be required");
    }

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          slug: formdata.slug,
          body: formdata.body,
          title: formdata.title,
        }),
      };
      const res = await fetch(`/api/v1/posts`, requestOptions);
      console.log(res);
      if (res?.status == 201) {
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
      <button
        onClick={() => setOpenModal(true)}
        className="bg-violet-800 rounded shadow px-3 py-1 my-4"
      >
        post +
      </button>

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

            <div className="relative">
              <input
                id=""
                name="slug"
                onChange={handleChange}
                value={formdata.slug}
                type="text"
                placeholder="slug"
                className="p-3 block w-full pl-10 drop-shadow-lg rounded-lg outline-none bg-transparent text-gray-50 border border-violet-400"
              />
              <span className="absolute top-1/4 left-2">
                <FaUserLock className="text-gray-500" size={23} />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="mt-5 w-full py-2 bg-violet-600 text-white px-3 shadow rounded"
          >
            Submit
          </button>
        </form>
      </Modal>
    </>
  );
};

export default AddPost;
