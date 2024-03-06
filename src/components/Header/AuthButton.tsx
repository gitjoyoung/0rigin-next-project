'use client'

import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AuthButton() {
   const router = useRouter()

   const { data: session, status } = useSession()
   if (status === 'loading') {
      return <div>로딩 중...</div> // 또는 로딩 인디케이터를 표시할 수 있습니다.
   }

   return (
      <div className=" text-sm flex gap-3 items-center ">
         {session ? (
            <div className="flex-col">
               <p>{`${session.user.email}`}</p>
               <div className="flex gap-2 justify-end">
                  <button
                     type="button"
                     className="text-xs "
                     onClick={() => signOut({ callbackUrl: '/' })}
                  >
                     로그아웃
                  </button>
                  <button
                     type="button"
                     onClick={() => router.push('/mypage')}
                     className="text-xs"
                  >
                     마이페이지
                  </button>
               </div>
            </div>
         ) : (
            <>
               <button
                  type="button"
                  className=" text-sm"
                  onClick={() => router.push('/login')}
               >
                  로그인
               </button>
               <button
                  type="button"
                  className=" text-sm"
                  onClick={() => router.push('/sign')}
               >
                  회원가입
               </button>
            </>
         )}
      </div>
   )
}
