'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function AuthButton({ name }) {
   const router = useRouter()

   const [isLoggedIn, setLoggedIn] = useState(false)
   return (
      <div className=" text-sm flex gap-3 items-center  justify-end">
         {isLoggedIn ? (
            <>
               <p>{`${name}님 반갑습니다`}</p>
               <div className="flex gap-2 justify-end">
                  <button
                     type="button"
                     className="text-xs"
                     onClick={() => setLoggedIn(false)}
                  >
                     로그아웃
                  </button>
                  <button type="button" className="text-xs">
                     마이페이지
                  </button>
               </div>
            </>
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
