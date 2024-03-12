"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const LoginForm = () => {
  const router = useRouter();

  const [formdata, setformdata] = useState({
    email: "",
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

    console.log({
      email: formdata.email,
      password: formdata.password,
    });

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formdata,
        }),
      };
      const res = await fetch(`/api/v1/posts`, requestOptions);
      console.log(res);
      if (res?.status == 201) {
        router.refresh();
        alert("register successfull");
      }
    } catch (error: any) {
      console.log(error);
    }
  };
  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          value={formdata.email}
          type="email"
          name="email"
          placeholder="email"
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
          className="w-full bg-violet-700 hover:bg-violet-700/90"
          type="submit"
        >
          login
        </button>
      </form>
      <div className="flex gap-2 items-center">
        <h4>Create an account</h4>
        <Link href={"/login/register"} className="hover:text-blue-600">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
