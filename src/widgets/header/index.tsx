'use client'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import SearchBox from '../search-box'
import AuthButtons from './ui/auth-buttons'
import MobileSideMenu from './ui/mobile-side-menu'
import Navigation from './ui/navigation'

const ThemeToggle = dynamic(() => import('./ui/theme-toggle'), {
   ssr: false,
   loading: () => null, // 초기 페인트 때 빈 자리
})
export default function Header() {
   return (
      <header className="flex items-center justify-between p-1 sm:h-12 h-10 w-full border-b border-gray-400 dark:border-white font-dos">
         {/* 로고 + 네비게이션 */}
         <div className="flex gap-4 items-center">
            {/* 로고 */}
            <Link className="text-xl sm:text-2xl  font-bold px-1" href="/">
               0RIGIN
            </Link>

            {/* 데스크톱 네비게이션 */}
            <Navigation />
         </div>
         {/* 모바일 네비게이션  클라이언트 컴포넌트 */}
         <div className="flex items-center gap-4">
            <SearchBox />
            <ThemeToggle />
            <MobileSideMenu />
            <div className="hidden sm:flex items-center gap-4">
               <AuthButtons />
            </div>
         </div>
      </header>
   )
}
