"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  return (
    <nav className="gap-10  py-4 bg-violet-900 shadow drop-shadow-sm">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto px-4">
        <Link href={"/"}>Home</Link>
        {/* <Link href={"/login"}>Login</Link>
         */}
        <Account />
      </div>
    </nav>
  );
};

function Account() {
  const { data: session, status } = useSession();
  const [open, setOpen] = useState(false);
  const dropDownRef = useRef(null);
  const items = ["Profile", "Dashboard", "Settings", "Log Out"];

  useEffect(() => {
    const close = (e: { target: any }) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", close);
    return () => {
      document.removeEventListener("mousedown", close);
    };
  }, []);

  return (
    <div ref={dropDownRef} className="relative  text-gray-100">
      <button onClick={() => setOpen((prev) => !prev)}>
        <span className="w-3 h-3 p-3 rounded-full bg-slate-500">
          {status === "authenticated" ? session?.user?.name?.slice(0, 1) : "U"}
        </span>
      </button>
      <ul
        className={`${
          open ? "visible duration-300" : "invisible"
        } absolute right-0 top-12 z-50 w-fit rounded-sm bg-slate-700 border-violet-700 shadow-md  py-2`}
      >
        {status === "authenticated" ? (
          <>
            <li>
              <Link href={"#"} className=" py-1 px-5">
                Profile
              </Link>
            </li>
            <li>
              <button
                className="py-1 px-5 text-nowrap"
                onClick={() => signOut()}
              >
                Log-out
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"} className="py-1 px-5 text-nowrap">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
