import Link from "next/link";
import React from "react";

const ProfileLayout: React.FC = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="flex gap-3">
      <nav className="min-w-[200px] bg-slate-700">
        <ul className="flex flex-col justify-center items-center gap-4 pt-5">
          <li>
            <Link href={`/user-profile`}>Profile</Link>
          </li>
          <li>
            <Link href={`/user-profile`}>Profile</Link>
          </li>
          <li>
            <Link href={`/user-profile`}>Profile</Link>
          </li>
        </ul>
      </nav>
      <div className="min-h-screen">{children}</div>
    </main>
  );
};

export default ProfileLayout;
