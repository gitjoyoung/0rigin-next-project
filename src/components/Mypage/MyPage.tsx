'use client'

import { useSession } from 'next-auth/react'
import React from 'react'
import Profile from './Profile'
import ProfileMenu from './ProfileMenu'

export default function MyPage() {
   const { data, status } = useSession()
   if (status === 'loading') return <div>로딩중...</div>
   if (status === 'unauthenticated') return <div>로그인이 필요합니다.</div>
   const { user } = data
   console.log(user)

   return (
      <section className="grid grid-cols-4 grid-flow-row border  border-black rounded-lg overflow-hidden  h-[100vh]">
         <div className="p-2  w-full">
            <Profile name={user.name} email={user.email} />
            <ProfileMenu />
         </div>
         <div className="sm:col-span-3 bg-gray-200 overflow-hidden">
            <h1 className="font-bold">내가 작성한 글</h1>
         </div>
      </section>
   )
}
