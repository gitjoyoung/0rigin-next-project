'use client'

import {
   Sidebar,
   SidebarContent,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuButton,
   SidebarMenuItem,
   SidebarProvider,
} from '@/shared/shadcn/ui/sidebar'
import type { MenuItem } from '../types/menu-type'

interface MypageMenuProps {
   selectedMenu: MenuItem
   onMenuClick: (menu: MenuItem) => void
}

const MENU_LIST: { id: MenuItem; label: string }[] = [
   { id: 'profile', label: '프로필' },
   { id: 'posts', label: '내가 작성한 글' },
   { id: 'comments', label: '내가 작성한 댓글' },
   { id: 'likes', label: '좋아요한 글' },
   { id: 'settings', label: '설정' },
]

export default function MypageMenu({
   selectedMenu,
   onMenuClick,
}: MypageMenuProps) {
   return (
      <div className="relative h-full ">
         <SidebarProvider defaultOpen>
            <Sidebar className="absolute left-0 top-0 h-full">
               <SidebarHeader className="border-b p-4">
                  <h2 className="text-lg font-semibold">마이페이지</h2>
               </SidebarHeader>
               <SidebarContent>
                  <SidebarMenu>
                     {MENU_LIST.map((item) => (
                        <SidebarMenuItem key={item.id}>
                           <SidebarMenuButton
                              onClick={() => onMenuClick(item.id)}
                              className={
                                 selectedMenu === item.id ? 'bg-gray-100' : ''
                              }
                           >
                              {item.label}
                           </SidebarMenuButton>
                        </SidebarMenuItem>
                     ))}
                  </SidebarMenu>
               </SidebarContent>
            </Sidebar>
         </SidebarProvider>
      </div>
   )
}
