"use client";

import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

const AdminRegisterpage = () => {
  const router = useRouter();

  const [formdata, setformdata] = useState({
    name: "",
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

  const handlesubmit = async (e: any) => {
    e.preventDefault();

    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formdata,
        }),
      };
      const res = await fetch(`/api/v1/users/admin`, requestOptions);
      console.log(res);
      if (res?.status == 201) {
        router.refresh();
        alert("register successfull");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleLogin = () => {
    router.push("/login/admin");
  };
  return (
    <div className="max-w-xl mx-auto pt-20">
      <form onSubmit={handlesubmit} className="flex flex-col gap-4">
        <input
          onChange={handleChange}
          value={formdata.name}
          type="text"
          name="name"
          placeholder="name"
          className="border bg-transparent p-3"
          id=""
        />
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
          register
        </button>
      </form>
      <div className="flex gap-2 items-center">
        <h4>already an account</h4>
        <button onClick={handleLogin} className="hover:text-blue-600">
          Login
        </button>
      </div>
    </div>
  );
};

export default AdminRegisterpage;
