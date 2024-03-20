"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";

const AdminLoginpage = () => {
  const router = useRouter();

  const [formdata, setformdata] = useState({
    mobile: "",
    password: "",
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

    try {
      const res = await signIn("CustomCredentials", {
        mobile: formdata.mobile,
        password: formdata.password,
        redirect: true,
        callbackUrl: "/",
      });
      console.log(res);
      if (!res?.ok) {
        // console.log(res);
        console.log(res?.error);
      }
      if (res?.ok) {
        alert("LOGIN SUCCESSFULL");
        router.push("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-xl mx-auto pt-20">
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          value={formdata.mobile}
          type="text"
          name="mobile"
          placeholder="mobile"
          className="border bg-transparent p-3"
          id=""
        />
        <input
          onChange={handleChange}
          value={formdata.password}
          type="password"
          name="password"
          placeholder="password"
          className="border bg-transparent p-3"
          id=""
        />
        <button
          className="w-full bg-violet-700 hover:bg-violet-700/90 p-3 rounded-md"
          type="submit"
        >
          login
        </button>
      </form>
      <div className="flex gap-2 items-center">
        <h4>Create an account</h4>
        <Link
          href={"/login/admin/admin-register"}
          className="hover:text-blue-600"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default AdminLoginpage;
