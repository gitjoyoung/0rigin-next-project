'use client'

import Link from 'next/link'
import AuthButtonGroup from './AuthButtonGroup'
import { nanoid } from 'nanoid'
import SearchBox from '@/widgets/SearchBox'

const HEADER_NAV_LIST = Object.freeze([
   {
      id: 'introduce',
      title: '소개',
      url: '/introduce',
   },
   {
      id: 'board',
      title: '게시판',
      url: '/board',
   },
   {
      id: 'quiz',
      title: '퀴즈',
      url: '/quiz',
   },
])

export default function Header() {
   return (
      <header className="flex items-center justify-between px-4 py-2 h-16 w-full border-b border-black shadow-md">
         {/* 로고 + 네비게이션 */}
         <div className="flex items-center gap-4">
            {/* 로고 */}
            <Link href="/">
               {/* 로고의 크기를 변경하고 싶다면 md:text-4xl, sm:text-2xl 등 조정 */}
               <h1 className="text-2xl font-bold">0rigin</h1>
            </Link>

            {/* 네비게이션 (큰 화면에서만 보이게 할 수도 있음) */}
            <nav className="hidden md:flex gap-4">
               {HEADER_NAV_LIST.map(({ title, url }) => (
                  <Link key={nanoid()} href={url}>
                     <span className="hover:text-gray-900 hover:font-semibold text-md font-normal">
                        {title}
                     </span>
                  </Link>
               ))}
            </nav>
         </div>
         {/* 검색창 + 인증 버튼 */}
         <div className="flex items-center gap-4">
            <SearchBox />
            <AuthButtonGroup />
         </div>
      </header>
   )
}
