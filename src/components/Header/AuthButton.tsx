'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/route'
import AuthSignUp from './AuthSignUp'
import { auth } from '@/auth'
import { signOut, useSession } from 'next-auth/react'

export default function AuthButton() {
   const { push } = useRouter()

   const user = {
      email: '',
   }

   return (
      <div className="flex-col gap-1 text-xs ">
         <p className="m-1">{user.email}</p>
         <div className="flex gap-2 justify-end">
            {true ? (
               <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-logout"
               >
                  로그아웃
               </button>
            ) : (
               <button
                  type="button"
                  onClick={() => push(ROUTES.MYPAGE)}
                  className="btn-mypage"
               >
                  마이페이지
               </button>
            )}
         </div>
      </div>
   )
}
