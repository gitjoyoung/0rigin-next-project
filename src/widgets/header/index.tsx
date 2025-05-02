import { ROUTE_BOARD, ROUTE_QUIZ, ROUTE_UTILS } from '@/constants/pathname'
import SearchBox from '@/widgets/search-box'
import Link from 'next/link'
import AuthButton from './auth-buttons'
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

export default function Header() {
   return (
      <header className="flex items-center justify-between py-1 sm:h-12 h-10 w-full border-b border-gray-400 dark:border-white ">
         {/* 로고 + 네비게이션 */}
         <div className="flex gap-4 items-center">
            {/* 로고 */}
            <Link className="text-xl sm:text-2xl font-dos font-bold" href="/">
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
            {/* 검색창 + 인증 버튼 */}
            <div className="hidden sm:flex  items-center gap-4">
               <AuthButton />
            </div>
            {/* 모바일 메뉴 토글 */}
            <MobileSideMenu />{' '}
         </div>
      </header>
   )
}
