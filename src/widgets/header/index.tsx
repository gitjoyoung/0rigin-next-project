'use client'
import SearchBox from '../search-box'
import AuthButtons from './ui/auth-buttons'
import Logo from './ui/logo'
import MobileSideMenu from './ui/mobile-side-menu'
import Navigation from './ui/navigation'
import ThemeToggle from './ui/theme-toggle'

export default function Header() {
   return (
      <header className="flex items-center justify-between p-1 sm:h-12 h-10 w-full border-b border-gray-400 dark:border-white ">
         <div className="flex gap-4 items-center">
            <Logo />
            <Navigation />
         </div>
         <div className="flex items-center gap-4">
            <SearchBox />
            <ThemeToggle />
            <div className="sm:hidden">
               <MobileSideMenu />
            </div>
            <div className="hidden sm:block">
               <AuthButtons />
            </div>
         </div>
      </header>
   )
}
