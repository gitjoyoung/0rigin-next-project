'use client'
import { useState } from 'react'
import MypageMenu from './MypageMenu'
import LikedPosts from './contents/LikedPosts'
import MyComments from './contents/MyComments'
import MyPosts from './contents/my-posts'
import Settings from './contents/setting'

type MenuItem = 'posts' | 'comments' | 'likes' | 'settings'

export default function MyPage() {
   const [selectedMenu, setSelectedMenu] = useState<MenuItem>('posts')

   const handleMenuClick = (menu: MenuItem) => {
      setSelectedMenu(menu)
   }

   const renderContent = () => {
      switch (selectedMenu) {
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
      <section className="flex min-h-[100vh]  ">
         <div className="relative h-full w-[250px] sm:">
            <MypageMenu
               selectedMenu={selectedMenu}
               onMenuClick={handleMenuClick}
            />
         </div>
         <div className="flex-1  overflow-hidden p-4">{renderContent()}</div>
      </section>
   )
}
