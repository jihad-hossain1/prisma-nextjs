"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";
import { signIn } from "next-auth/react";

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
      const res = await signIn("credentials", {
        email: formdata.email,
        password: formdata.password,
        redirect: false,
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
          className="w-full bg-violet-700 hover:bg-violet-700/90 p-3 rounded-md"
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
