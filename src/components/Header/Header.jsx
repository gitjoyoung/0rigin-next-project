import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";
import { headerNav } from "./../../constants/index";

export default function Header() {
  return (
    <header className="flex justify-between items-end md:py-5 md:px-6 w-full border-b border-black  md:h-[8vh]  shadow-md">
      <Link href={"/"} className="md:text-4xl  font-bold ">
        Origin
      </Link>
      <div className=" items-baseline  gap-10 text-gray-600 hidden sm:flex md:flex lg:flex xl:flex">
        {headerNav.map((nav, key) => (
          <Link
            key={key}
            href={nav.url}
            className="hover:text-gray-900 text-md font-normal "
          >
            {nav.title}
          </Link>
        ))}
      </div>

      <div className=" gap-10 items-center">
        <AuthButton />
      </div>
    </header>
  );
}
