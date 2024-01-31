import footerNav from '@/constants/home/footerNav'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
   return (
      <div className="text-xs flex flex-col items-center justify-center gap-2  bottom-0  bg-gray-200 p-4 w-full">
         <p className="">Origin project</p>
         <ul className="  flex gap-4 flex-wrap font-semibold">
            {footerNav.map(({ name, link, id }) => (
               <li className="" key={id}>
                  <Link href={link}>{name}</Link>
               </li>
            ))}
         </ul>
         <p>Copyright © Origin Corp. All Rights Reserved.</p>
      </div>
   )
}
