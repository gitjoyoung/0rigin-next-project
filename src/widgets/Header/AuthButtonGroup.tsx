'use client'

import { ROUTE_LOGIN, ROUTE_MYPAGE, ROUTE_SIGN } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'

export default function AuthButtonGroup() {
   const { data: session } = useSession() // 클라이언트 훅

   return (
      <section className="flex items-end gap-5">
         {!session?.user?.email ? (
            <div className="flex gap-2 text-xs">
               <Button asChild size="sm" variant="outline">
                  <Link href={ROUTE_LOGIN}>로그인</Link>
               </Button>
               <Button asChild size="sm" variant="outline">
                  <Link href={ROUTE_SIGN}>회원가입</Link>
               </Button>
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
