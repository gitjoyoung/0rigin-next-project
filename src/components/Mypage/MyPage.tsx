'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function MyPage() {
   const { data, status } = useSession()
   if (status === 'loading') return <div>로딩중...</div>
   if (status === 'unauthenticated') return <div>로그인이 필요합니다.</div>
   console.log(data)
   const { user } = data

   return (
      <div className="flex border border-black rounded-lg p-1 h-[100vh]  justify-between flex-wrap">
         <div className="border w-96 flex flex-col gap-2 ">
            <h1 className="text-2xl font-bold">마이페이지</h1>
            <ul className="mypage-menu">
               <li className="flex-col flex">
                  <p className=" text-xs">사용자 이메일 </p>
                  <span>{user.email}</span>
               </li>
               <li className="flex-col flex">
                  <p className=" text-xs">사용자 이름 </p>
                  <span> {user.name}</span>
               </li>

               <li>
                  <button type="button" onClick={() => console.log('asd')}>
                     로그아웃
                  </button>
               </li>
            </ul>
         </div>

         <div className="flex-auto bg-gray-300">
            <h1 className="font-bold">내가 작성한 글</h1>
         </div>
      </div>
   )
}
