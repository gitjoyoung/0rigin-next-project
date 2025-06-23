'use client'

import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import {
   Menubar,
   MenubarContent,
   MenubarItem,
   MenubarLabel,
   MenubarMenu,
   MenubarSeparator,
   MenubarTrigger,
} from '@/shared/shadcn/ui/menubar'

import { HEADER_NAV_LIST } from '../constant/header-menu'

export default function Navigation() {
   return (
      <nav className="ml-4 items-end text-base hidden md:flex">
         <Menubar className="border-none bg-transparent p-0">
            {HEADER_NAV_LIST.map((item) => (
               <MenubarMenu key={item.id}>
                  {item.submenuGroups ? (
                     <>
                        <MenubarTrigger className="flex cursor-pointer items-center gap-1 hover:font-semibold data-[state=open]:font-semibold text-md transition-all duration-200">
                           {item.title}
                           <ChevronDown className="relative top-[1px] h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                        </MenubarTrigger>
                        <MenubarContent className="min-w-[250px]">
                           {item.submenuGroups.map((group, groupIndex) => (
                              <React.Fragment key={group.id}>
                                 {group.title && (
                                    <MenubarLabel className="px-2 py-1.5 text-xs font-semibold text-muted-foreground tracking-widest uppercase">
                                       {group.title}
                                    </MenubarLabel>
                                 )}
                                 {group.items.map((subItem) => (
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
                                 {groupIndex <
                                    item.submenuGroups.length - 1 && (
                                    <MenubarSeparator />
                                 )}
                              </React.Fragment>
                           ))}
                        </MenubarContent>
                     </>
                  ) : (
                     item.url && (
                        <MenubarItem asChild>
                           <Link
                              className="hover:font-semibold text-md transition-all duration-200"
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
