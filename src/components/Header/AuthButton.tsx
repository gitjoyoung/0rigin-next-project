import React from 'react'
import { useRouter } from 'next/navigation' // 'next/navigation'은 잘못된 모듈명입니다. 'next/router'가 올바른 모듈명입니다.
import { signOut, useSession } from 'next-auth/react'
import { ROUTES } from '@/constants/route'
import AuthSignUp from './AuthSignUp'

function AuthButton() {
   const { push } = useRouter()
   const { data: session, status } = useSession()

   if (status === 'loading' || !session) {
      return <AuthSignUp /> // 일관성 있는 언어 사용 (예: 영어)
   }

   if (session) {
      return (
         <div className="flex-col gap-1 text-xs ">
            <p className="m-1">{session.user.email}</p>
            <div className="flex gap-2 justify-end">
               <button
                  type="button"
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="btn-logout"
               >
                  로그아웃
               </button>
               <button
                  type="button"
                  onClick={() => push(ROUTES.MYPAGE)}
                  className="btn-mypage"
               >
                  마이페이지
               </button>
            </div>
         </div>
      )
   }
}

export default AuthButton
