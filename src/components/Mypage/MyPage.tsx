'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import Profile from './Profile'
import ProfileMenu from './ProfileMenu'

export default function MyPage() {
   const user = {
      name: '임시 이름',
      email: '임시 이메일 데이터'
   }
   return (
      <section className="flex flex-wrap border border-black rounded-lg overflow-hidden h-[100vh]">
         <div className="p-2 flex flex-col items-center sm:min:w-full min-w-[350px] ">
            <Profile name={user.name} email={user.email} />
            <ProfileMenu />
         </div>
         <div className="sm:flex-1 w-full   bg-gray-200 overflow-hidden">
            <h1 className="font-bold">내가 작성한 글</h1>
         </div>
      </section>
   )
}
