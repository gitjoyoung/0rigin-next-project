import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/shared/shadcn/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { HEADER_NAV_LIST } from '.'
import AuthButton from './auth-buttons'
import ThemeToggle from './theme-toggle'

export default function MobileSideMenu() {
   return (
      <Sheet>
         <SheetTrigger asChild>
            <button className="md:hidden" aria-label="Open Mobile Menu">
               <Menu />
            </button>
         </SheetTrigger>
         <SheetContent side="right" className="w-[250px] p-0">
            <SheetHeader className="border-b p-4">
               <SheetTitle>메뉴</SheetTitle>
            </SheetHeader>

            <div className="flex flex-col">
               {/* 모바일 화면 로그인, 회원가입 */}
               <div className="flex justify-center border-b gap-2 py-4">
                  <AuthButton />
               </div>

               {/* 모바일 화면 네비게이터 */}
               <nav className="flex flex-col">
                  {HEADER_NAV_LIST.map(({ id, url, title }) => (
                     <SheetClose asChild key={id}>
                        <Link
                           href={url}
                           className="px-4 py-3 border-b hover:bg-accent hover:text-accent-foreground"
                        >
                           {title}
                        </Link>
                     </SheetClose>
                  ))}
               </nav>
               <div className="flex justify-center border-b gap-2 py-4">
                  <ThemeToggle />
               </div>
            </div>
         </SheetContent>
      </Sheet>
   )
}
