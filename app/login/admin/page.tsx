"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { signIn } from "next-auth/react";

const AdminLoginpage = () => {
  const router = useRouter();
  const [errors, seterrors] = useState(null)
  const [formdata, setformdata] = useState({
    aemail: "",
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

  const handlesubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        aemail: formdata.aemail,
        password: formdata.password,
        redirect: false,
        for: 'admin',
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
      seterrors(error)
      console.log(error);
    }
  };

  useEffect(() => {
    if (errors) {
      console.log(errors)
    }
  }, [errors])
  return (
    <div className="max-w-xl mx-auto pt-20">
      <h4 className="text-center font-semibold py-5">
        Admin Login page.
      </h4>
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <h4 className="text-sm text-red-600">{errors ? errors : ''}</h4>
        <input
          onChange={handleChange}
          value={formdata.aemail}
          type="text"
          name="aemail"
          placeholder="admin email"
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
      <div className="flex gap-2 items-center mt-2">
        <h4>Create an admin account</h4>
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
