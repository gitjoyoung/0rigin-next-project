import Link from "next/link";
import React from "react";

export default function Footer() {
  const contactList = [
    { name: "1:1문의", link: "/" },
    { name: "고객센터", link: "/" },
    { name: "contact", link: "/" },
    { name: "인재채용", link: "/" },
  ];

  return (
    <div className="text-xs flex flex-col items-center justify-center gap-2  bottom-0  bg-gray-200 p-4 w-full">
      <p className="">Origin project</p>
      <ul className="  flex gap-4 flex-wrap font-semibold">
        {contactList.map((item, index) => (
          <li className="" key={index}>
            <Link href={item.link}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <p>Copyright © Origin Corp. All Rights Reserved.</p>
    </div>
  );
}
