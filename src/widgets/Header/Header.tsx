'use client'

import Link from 'next/link'
import AuthButtonGroup from './AuthButtonGroup'
import SearchBox from '@/widgets/SearchBox'
import { HEADER_NAV_LIST } from './contants/header-list'
import MobileNavModal from './Mobile/MobileNavModal'

export default function Header() {
   return (
      <header className="flex items-center justify-between px-4 py-2 h-16 w-full border-b border-black shadow-md">
         {/* 로고 + 네비게이션 */}
         <div className="flex items-center gap-4">
            {/* 로고 */}
            <Link href="/">
               <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                  0rigin
               </h3>
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="hidden md:flex gap-4">
               {HEADER_NAV_LIST.map(({ id, url, title }) => (
                  <Link key={id} href={url}>
                     <span className="hover:text-gray-900 hover:font-semibold text-md">
                        {title}
                     </span>
                  </Link>
               ))}
            </nav>
         </div>

         {/* 검색창 + 인증 버튼 */}
         <div className="flex items-center gap-4">
            {/* 데스크톱 뷰 */}
            <div className="hidden sm:flex items-center gap-4">
               <SearchBox />
               <AuthButtonGroup />
            </div>

            {/* 모바일 메뉴 토글 */}
            <MobileNavModal />
         </div>
      </header>
   )
}
