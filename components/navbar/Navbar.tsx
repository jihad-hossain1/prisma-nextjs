import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center gap-10 justify-center py-4 bg-violet-900 shadow drop-shadow-sm">
      <Link href={"/"}>Home</Link>
      <Link href={"/login"}>Login</Link>
    </nav>
  );
};

export default Navbar;
