import Link from "next/link";
import React from "react";
import AuthButton from "./AuthButton";
import { headerNav } from "../../constants/header_menu";

export default function Header() {
  return (
    <header className='flex justify-between p-3  w-full border-b mt-1 mb-2 border-black  shadow-md'>
      <Link href={"/"} className='md:text-4xl  font-bold '>
        Origin
      </Link>
      <div className='  items-end  gap-10 text-gray-600 hidden sm:flex md:flex lg:flex xl:flex'>
        {headerNav.map((nav, key) => (
          <Link key={key} href={nav.url}>
            <p className='hover:text-gray-900 hover:font-semibold text-md font-normal '>{nav.title}</p>
          </Link>
        ))}
      </div>

      <AuthButton />
    </header>
  );
}
