import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AuthButton() {
   const router = useRouter()
   const { data: session, status } = useSession()

   if (status === 'loading') {
      return <div>로딩 중...</div>
   }

   const handleSignOut = () => {
      signOut({ callbackUrl: '/' })
   }

   const handleLogin = () => {
      router.push('/login')
   }

   const handleSignup = () => {
      router.push('/sign')
   }

   const handleMyPage = () => {
      router.push('/mypage')
   }

   return (
      <div className="text-sm flex gap-3 items-center">
         {session ? (
            <div className="flex-col gap-1">
               <p className="m-1">{`${session.user.email}`}</p>
               <div className="flex gap-2 justify-end">
                  <button
                     type="button"
                     className="text-xs p-0.5"
                     onClick={handleSignOut}
                  >
                     로그아웃
                  </button>
                  <button
                     type="button"
                     className="text-xs p-0.5"
                     onClick={handleMyPage}
                  >
                     마이페이지
                  </button>
               </div>
            </div>
         ) : (
            <>
               <button type="button" className="text-sm" onClick={handleLogin}>
                  로그인
               </button>
               <button type="button" className="text-sm" onClick={handleSignup}>
                  회원가입
               </button>
            </>
         )}
      </div>
   )
}
