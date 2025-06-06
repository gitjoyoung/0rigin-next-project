'use client'

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
import { useState } from 'react'
import AuthButtons from './auth-buttons'
import { HEADER_NAV_LIST } from './constant/header-menu'

export default function MobileSideMenu() {
   const [isOpen, setIsOpen] = useState(false)
   const handleClose = () => setIsOpen(false)

   return (
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
               <div className="flex justify-center border-b gap-2 py-4">
                  <SheetClose asChild>
                     <AuthButtons onClick={handleClose} />
                  </SheetClose>
               </div>

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
            </div>
         </SheetContent>
      </Sheet>
   )
}
