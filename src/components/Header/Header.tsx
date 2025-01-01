'use client'
import Link from 'next/link'
import AuthButtonGroup from './AuthButtonGroup'
import SearchBox from '@/shared/ui/search/SearchBox'
import { HEADER_NAV_LIST } from '@/constants/home/headerNav'
import { nanoid } from 'nanoid'

export default function Header() {
   return (
      <header className="flex justify-between p-1 sm:p-2 items-end h-11 w-full border-b my-1 border-black  shadow-md">
         {/* 로고 */}
         <Link href="/">
            <h1 className="md:text-4xl text-xl font-bold">0rigin</h1>
         </Link>
         {/* 메뉴 네비게이터 */}
         <div className="flex gap-2 items-center">
            {HEADER_NAV_LIST.map(({ title, url }) => (
               <Link key={nanoid()} href={url}>
                  <p className="hover:text-gray-900 hover:font-semibold text-md font-normal ">
                     {title}
                  </p>
               </Link>
            ))}
            <SearchBox />
         </div>

         {/* 반응형 네비게이션 */}
         <AuthButtonGroup />
      </header>
   )
}
