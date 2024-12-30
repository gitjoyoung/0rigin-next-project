'use client'
import Link from 'next/link'
import NavigationList from './NavigationList'
import AuthButtonGroup from './AuthButtonGroup'
import SearchBox from '@/shared/ui/search/SearchBox'

export default function Header() {
   return (
      <header className="flex justify-between p-1 sm:p-2 items-end  w-full border-b my-1 border-black  shadow-md">
         {/* 로고 */}
         <Link href="/">
            <h1 className="md:text-4xl text-xl font-bold">0rigin</h1>
         </Link>
         {/* 메뉴 네비게이터 */}
         <NavigationList />

         {/* 서치바 */}
         <div className="flex-1 flex justify-start px-2 ">
            <SearchBox />
         </div>

         {/* 반응형 네비게이션 */}
         <AuthButtonGroup />
      </header>
   )
}
