import { HEADER_NAV_LIST } from '@/constants/home/headerNav'
import { nanoid } from 'nanoid'
import Link from 'next/link'

export default function NavigationList() {
   return (
      <nav className="  hidden md:flex justify-between  mx-8 text-sm items-end gap-8 text-gray-600 ">
         {HEADER_NAV_LIST.map(({ title, url }) => (
            <Link key={nanoid()} href={url}>
               <p className="hover:text-gray-900 hover:font-semibold text-md font-normal ">
                  {title}
               </p>
            </Link>
         ))}
      </nav>
   )
}
