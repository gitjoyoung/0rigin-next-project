'use client'

import {
   Sheet,
   SheetClose,
   SheetContent,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/shared/shadcn/ui/sheet'
import { cn } from '@/shared/utils/cn'
import { ChevronDown, Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { HEADER_NAV_LIST } from '../constant/header-menu'
import AuthButtons from './auth-buttons'

export default function MobileSideMenu() {
   const [isOpen, setIsOpen] = useState(false)
   const [expandedMenus, setExpandedMenus] = useState<string[]>([])

   const handleClose = () => setIsOpen(false)

   const toggleMenu = (menuId: string) => {
      setExpandedMenus((prev) =>
         prev.includes(menuId)
            ? prev.filter((id) => id !== menuId)
            : [...prev, menuId],
      )
   }

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
                  {HEADER_NAV_LIST.map((item) => (
                     <div key={item.id}>
                        {item.submenuGroups ? (
                           // 하위메뉴가 있는 경우
                           <div>
                              <button
                                 onClick={() => toggleMenu(item.id)}
                                 className="w-full flex items-center justify-between border-b px-4 py-3 hover:bg-accent hover:text-accent-foreground"
                              >
                                 {item.title}
                                 <ChevronDown
                                    className={cn(
                                       'h-4 w-4 transition-transform duration-200',
                                       expandedMenus.includes(item.id) &&
                                          'rotate-180',
                                    )}
                                 />
                              </button>
                              {expandedMenus.includes(item.id) && (
                                 <div className="bg-gray-50 py-1 dark:bg-gray-800">
                                    {item.submenuGroups?.map((group) => (
                                       <div key={group.id} className="py-1">
                                          {group.title && (
                                             <h4 className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                                {group.title}
                                             </h4>
                                          )}
                                          {group.items.map((subItem) => (
                                             <SheetClose
                                                asChild
                                                key={subItem.id}
                                             >
                                                <Link
                                                   href={subItem.url}
                                                   className="flex items-center gap-3 py-2 pl-6 pr-4 text-sm hover:bg-accent hover:text-accent-foreground"
                                                >
                                                   <subItem.icon className="h-4 w-4 text-muted-foreground" />
                                                   <span>{subItem.title}</span>
                                                </Link>
                                             </SheetClose>
                                          ))}
                                       </div>
                                    ))}
                                 </div>
                              )}
                           </div>
                        ) : (
                           // 하위메뉴가 없는 경우
                           <SheetClose asChild>
                              <Link
                                 href={item.url || '#'}
                                 className="border-b px-4 py-3 hover:bg-accent hover:text-accent-foreground"
                              >
                                 {item.title}
                              </Link>
                           </SheetClose>
                        )}
                     </div>
                  ))}
               </nav>
            </div>
         </SheetContent>
      </Sheet>
   )
}
