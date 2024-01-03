import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center py-5 px-6 w-[100%]">
      <h1 className="text-3xl font-bold">Origin</h1>
      <nav className="flex items-start justify-between w-72  gap-3 ">
        <Link
          href={`/read/1`}
          className="md:text-lg xs:text-xs lg:text-lg  font-bold "
        >
          <h4>메뉴1</h4>
        </Link>
        <Link
          href={`/read/2`}
          className="md:text-lg xs:text-xs lg:text-lg  font-bold "
        >
          <h4>메뉴1</h4>
        </Link>
        <Link
          href={`/read/3`}
          className="md:text-lg xs:text-xs lg:text-lg  font-bold "
        >
          <h4>메뉴1</h4>
        </Link>
        <Link
          href={`/read/4`}
          className="md:text-lg xs:text-xs lg:text-lg  font-bold "
        >
          <h4>메뉴1</h4>
        </Link>
      </nav>
      <AuthButton />
    </header>
  );
}
