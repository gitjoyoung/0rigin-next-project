import { getUserServer } from '@/entities/auth/api/get-user-server'
import type { User } from '@supabase/supabase-js'
import Link from 'next/link'
import SearchBox from '../search-box'
import { HEADER_NAV_LIST } from './\bconstant/header-menu'
import AuthButtons from './auth-buttons'
import MobileSideMenu from './mobile-side-menu'
import ThemeToggle from './theme-toggle'

export default async function Header() {
   const user: User | null = await getUserServer()

   return (
      <header className="flex items-center justify-between p-1 sm:h-12 h-10 w-full border-b border-gray-400 dark:border-white ">
         {/* 로고 + 네비게이션 */}
         <div className="flex gap-4 items-center">
            {/* 로고 */}
            <Link
               className="text-xl sm:text-2xl font-dos font-bold px-1"
               href="/"
            >
               0RIGIN
            </Link>

            {/* 데스크톱 네비게이션 */}
            <nav className="ml-4 items-end text-base hidden md:flex gap-4">
               {HEADER_NAV_LIST.map(({ id, url, title }) => (
                  <Link
                     className="hover:font-semibold text-md"
                     key={id}
                     href={url}
                  >
                     {title}
                  </Link>
               ))}
            </nav>
         </div>
         {/* 모바일 네비게이션  클라이언트 컴포넌트 */}
         <div className="flex items-center gap-4">
            <SearchBox />
            <ThemeToggle />
            <MobileSideMenu session={user} />
            <div className="hidden sm:flex items-center gap-4">
               <AuthButtons session={user} />
            </div>
         </div>
      </header>
   )
}
