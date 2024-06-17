import Link from 'next/link'
import React from 'react'
import AuthButton from './AuthButton'
import SearchBox from '../Search/SearchBox'
import NavigationList from './NavigationList'

export default function Header() {
   return (
      <header className="flex justify-between p-1 sm:p-3 items-end  w-full border-b mt-1 mb-2 border-black  shadow-md">
         {/* 로고 */}
         <Link href="/">
            <h1 className="md:text-4xl text-xl font-bold ">0rigin</h1>
         </Link>
         {/* 메뉴 네비게이터 */}
         <NavigationList />
         {/* 서치바 */}
         <div className="flex-1 flex justify-start px-2">
            <SearchBox />
         </div>
         {/* 반응형 네비게이션 */}
         <div className="flex items-end gap-5">
            <AuthButton />
         </div>
      </header>
   )
}
