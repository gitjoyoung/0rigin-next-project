'use client'

import { useRouter } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/shared/shadcn/ui/button'
import { ROUTE_LOGIN, ROUTE_MYPAGE, ROUTE_SIGN } from '@/constants/pathname'
import Link from 'next/link'

export default function AuthButtonGroup() {
   const { data: session } = useSession() // 클라이언트 훅

   return (
      <section className="flex items-end gap-5">
         {!session?.user?.email ? (
            <div className="flex gap-2 text-xs">
               <Link href={ROUTE_LOGIN}>
                  <Button asChild size="sm">
                     <span>로그인</span>
                  </Button>
               </Link>
               <Link href={ROUTE_SIGN}>
                  <Button asChild size="sm">
                     <span>회원가입</span>
                  </Button>
               </Link>
            </div>
         ) : (
            <div className="flex flex-col gap-1">
               <p className="m-1 text-xs">{session.user.email}</p>
               <div className="flex gap-2 text-xs">
                  <Button
                     onClick={() => signOut({ callbackUrl: '/' })}
                     size="sm"
                  >
                     로그아웃
                  </Button>
                  <Link href={ROUTE_MYPAGE}>
                     <Button asChild size="sm">
                        <span>마이페이지</span>
                     </Button>
                  </Link>
               </div>
            </div>
         )}
      </section>
   )
}
