'use client'

import { ROUTE_BOARD, ROUTE_QUIZ, ROUTE_UTILS } from '@/constants/pathname'
import { SupabaseBrowserClient } from '@/lib/supabase/supabase-browser-client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import SearchBox from '../search-box'
import AuthButtons from './auth-buttons'
import MobileSideMenu from './mobile-side-menu'
import ThemeToggle from './theme-toggle'

export const HEADER_NAV_LIST = [
   {
      id: 'board',
      title: '게시판',
      url: ROUTE_BOARD,
   },
   {
      id: 'quiz',
      title: '퀴즈',
      url: ROUTE_QUIZ,
   },
   {
      id: 'utils',
      title: '유틸리티',
      url: ROUTE_UTILS,
   },
]
function useAuthSession() {
   const supabase = SupabaseBrowserClient()

   return useQuery({
      queryKey: ['auth-session'],
      queryFn: async () => {
         const {
            data: { session },
         } = await supabase.auth.getSession()
         return session
      },
   })
}
export default function Header() {
   const { data: session } = useAuthSession()

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
            <nav className="ml-4 items-end text-base  hidden md:flex gap-4">
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
         <div className="flex items-center gap-4">
            <SearchBox />
            <ThemeToggle />
            <MobileSideMenu session={session} />
            <div className="hidden sm:flex items-center gap-4">
               <AuthButtons session={session} />
            </div>
         </div>
      </header>
   )
}
