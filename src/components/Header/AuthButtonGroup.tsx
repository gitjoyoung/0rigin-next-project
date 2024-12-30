'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { ROUTES } from '@/constants/route'

export default function AuthButtonGroup() {
   const { data: session } = useSession() // 클라이언트 훅
   const { push } = useRouter()

   return (
      <section className="flex items-end gap-5">
         {!session?.user.email ? (
            <div className="flex gap-2 text-xs">
               <button
                  type="button"
                  onClick={() => push(ROUTES.LOGIN)}
                  className="btn-login"
               >
                  로그인
               </button>
               <button
                  type="button"
                  onClick={() => push(ROUTES.SIGN)}
                  className="btn-sighup"
               >
                  회원가입
               </button>
            </div>
         ) : (
            <div className="flex-col gap-1 ">
               <p className="m-1 text-xs">{session?.user.email}</p>
               <div className="flex gap-2 text-xs">
                  <button
                     type="button"
                     onClick={() => signOut({ callbackUrl: '/' })}
                     className="btn-login"
                  >
                     로그아웃
                  </button>
                  <button
                     type="button"
                     onClick={() => push(ROUTES.MYPAGE)}
                     className="btn-sighup"
                  >
                     마이페이지
                  </button>
               </div>
            </div>
         )}
      </section>
   )
}
