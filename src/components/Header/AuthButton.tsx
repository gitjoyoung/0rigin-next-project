'use client'

import { fetchLogout } from '@/app/api/auth/login'
import { auth } from '@/lib/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function AuthButton() {
   const router = useRouter()
   const [userId, setUserId] = useState('')
   const [isLoggedIn, setIsLoggedIn] = useState(false)
   const [isLoading, setIsLoading] = useState(true)

   useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
         if (user) {
            setUserId(user.email)
            setIsLoggedIn(true)
         } else {
            setIsLoggedIn(false)
         }
         // 로그인 상태 확인이 완료되면 로딩 상태를 false로 설정
         setIsLoading(false)
      })

      return () => unsubscribe()
   }, [])

   if (isLoading) {
      return <div>로딩 중...</div> // 또는 로딩 인디케이터를 표시할 수 있습니다.
   }

   return (
      <div className=" text-sm flex gap-3 items-center ">
         {isLoggedIn ? (
            <div className="flex-col">
               <p>{`${userId}`}</p>
               <div className="flex gap-2 justify-end">
                  <button
                     type="button"
                     className="text-xs "
                     onClick={fetchLogout}
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
