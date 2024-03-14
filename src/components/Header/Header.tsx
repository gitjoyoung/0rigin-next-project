'use client'

import Link from 'next/link'
import React from 'react'
import headerNav from '@/constants/home/headerNav'
import AuthButton from './AuthButton'
import SearchBox from './SearchBox'
import MobileAlramButton from './Mobile/MobileAlramButton'
import MobileMenuButton from './Mobile/MobileMenuButton'

export default function Header() {
   return (
      <header className="flex justify-between p-1 sm:p-3 items-end  w-full border-b mt-1 mb-2 border-black  shadow-md">
         {/* 로고 */}
         <Link href="/">
            <h1 className="md:text-4xl text-xl font-bold ">0rigin</h1>
         </Link>
         {/* 메뉴 네비게이터 */}
         <nav className="flex-1 hidden md:flex  ml-10  items-end gap-8 text-gray-600 ">
            {headerNav.map(({ title, url }) => (
               <Link key={title} href={url}>
                  <p className="hover:text-gray-900 hover:font-semibold text-md font-normal ">
                     {title}
                  </p>
               </Link>
            ))}
         </nav>

         {/* 서치바 */}
         <div className="flex-1 flex justify-end px-2">
            <SearchBox />
         </div>
         {/* 반응형 네비게이션 */}
         <div className="flex items-end gap-5">
            {/* PC 화면 로그인,  회원가입 */}
            <div className="hidden md:flex ">
               <AuthButton />
            </div>

            {/* MOBILE 화면  버튼 */}
            <div className="md:hidden  flex gap-2 items-center">
               <MobileAlramButton />
               <MobileMenuButton />
               {/* 모달 애니메이션  */}
            </div>
         </div>

         {/* 모달 배경 */}
      </header>
   )
}
