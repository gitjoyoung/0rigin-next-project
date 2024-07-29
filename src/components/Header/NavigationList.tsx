import { HEADER_NAV_LIST } from '@/constants/home/headerNav'
import Link from 'next/link'
import { v4 } from 'uuid'

export default function NavigationList() {
   return (
      <nav className="  hidden md:flex justify-between  mx-8  items-end gap-8 text-gray-600 ">
         {HEADER_NAV_LIST.map(({ title, url }) => (
            <Link key={v4()} href={url}>
               <p className="hover:text-gray-900 hover:font-semibold text-md font-normal ">
                  {title}
               </p>
            </Link>
         ))}
      </nav>
   )
}
