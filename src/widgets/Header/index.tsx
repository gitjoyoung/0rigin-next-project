'use client'

import SearchBox from '@/widgets/SearchBox'
import Link from 'next/link'
import AuthButtonGroup from './AuthButtonGroup'
import { HEADER_NAV_LIST } from './contants/header-list'
import MobileNavModal from './Mobile/MobileNavModal'
import ThemeToggle from './ThemeToggle'

export default function Header() {
   return (
      <header className="flex items-center justify-between sm:py-2 py-1 sm:h-12 h-10 w-full border-b border-black shadow-md">
         {/* 로고 + 네비게이션 */}
         <div className="flex items-center gap-4">
            {/* 로고 */}
            <Link href="/">
               <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
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
         <div className="hidden sm:flex  items-center gap-4">
            <ThemeToggle />
            <SearchBox />
            <AuthButtonGroup />
         </div>

         {/* 모바일 메뉴 토글 */}
         <MobileNavModal />
      </header>
   )
}
