import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";
import { headerNav } from "./../../constants/index";

export default function Header() {
  return (
    <header className="flex justify-between  items-center py-5 px-6 w-full">
      <Link href={"/"} className="text-4xl font-bold ">
        Origin
      </Link>
      <nav className="flex items-center justify-center gap-4 text-gray-600 ">
        {headerNav.map((nav, key) => (
          <Link key={key} href={nav.url} className="text-md  ">
            {nav.title}
          </Link>
        ))}
      </nav>
      <AuthButton />
    </header>
  );
}
