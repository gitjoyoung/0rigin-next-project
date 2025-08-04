'use client'

import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarMenu,
   MenubarTrigger,
} from '@/shared/shadcn/ui/menubar'

import { HEADER_NAV_LIST } from '../constant/header-menu'

export default function Navigation() {
   return (
      <nav className="ml-4 items-end text-base hidden md:flex">
         <Menubar className="border-none bg-transparent p-0">
            {HEADER_NAV_LIST.map((item) => (
               <MenubarMenu key={item.id}>
                  {item.submenuItems ? (
                     <>
                        <MenubarTrigger className="group flex cursor-pointer items-center gap-1 hover:font-semibold data-[state=open]:font-semibold text-md transition-all duration-200 bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                           {item.title}
                           <ChevronRight
                              className="
                                 relative h-4 w-4 text-transparent
                                 group-hover:text-current
                                 group-data-[state=open]:text-current
                                 transition-all duration-200
                                 group-data-[state=open]:rotate-90
                              "
                           />
                        </MenubarTrigger>
                        <MenubarContent className="min-w-[250px] ">
                           {item.submenuItems.map((subItem) => (
                              <MenubarItem asChild key={subItem.id}>
                                 <Link
                                    href={subItem.url || '#'}
                                    className="flex items-center gap-2 px-2 py-2"
                                 >
                                    <subItem.icon className="h-4 w-4 text-muted-foreground" />
                                    <span>{subItem.title}</span>
                                 </Link>
                              </MenubarItem>
                           ))}
                        </MenubarContent>
                     </>
                  ) : (
                     item.url && (
                        <MenubarItem asChild>
                           <Link
                              className="hover:font-semibold text-md transition-all duration-200 focus:bg-transparent"
                              href={item.url}
                           >
                              {item.title}
                           </Link>
                        </MenubarItem>
                     )
                  )}
               </MenubarMenu>
            ))}
         </Menubar>
      </nav>
   )
}
