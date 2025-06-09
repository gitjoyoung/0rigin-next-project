'use client'
import { useState } from 'react'
import type { MenuItem } from '../types/menu-type'

import LikedPosts from './contents/like-posts'
import MyComments from './contents/my-comments'
import MyPosts from './contents/my-posts'
import Settings from './contents/setting'
import MypageMenu from './my-page-menu'
import Profile from './profile'

export default function MyPage() {
   const [selectedMenu, setSelectedMenu] = useState<MenuItem>('profile')

   const handleMenuClick = (menu: MenuItem) => {
      setSelectedMenu(menu)
   }

   const renderContent = () => {
      switch (selectedMenu) {
         case 'profile':
            return <Profile />
         case 'posts':
            return <MyPosts />
         case 'comments':
            return <MyComments />
         case 'likes':
            return <LikedPosts />
         case 'settings':
            return <Settings />
         default:
            return null
      }
   }

   return (
      <section className="flex w-full min-h-[200px]">
         <div className=" h-full">
            <MypageMenu
               selectedMenu={selectedMenu}
               onMenuClick={handleMenuClick}
            />
         </div>
         <div className="flex-1 p-4">{renderContent()}</div>
      </section>
   )
}
