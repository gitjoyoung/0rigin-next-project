'use client'

import { signOut } from '@/auth'
import { ROUTE_LOGIN, ROUTE_MYPAGE, ROUTE_SIGN } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import { useAuthStore } from '@/store/authStore'
import Link from 'next/link'

export default function AuthButtonGroup() {
   const { user, setUser } = useAuthStore()

   const handleSignOut = async () => {
      const result = await signOut()
      if ('success' in result) {
         setUser(null)
      }
   }

   return (
      <section className="flex items-end gap-5">
         {!user?.email ? (
            <div className="flex gap-2 text-xs">
               <Button asChild size="sm" variant="outline">
                  <Link href={ROUTE_LOGIN}>로그인</Link>
               </Button>
               <Button asChild size="sm" variant="outline">
                  <Link href={ROUTE_SIGN}>회원가입</Link>
               </Button>
            </div>
         ) : (
            <div className="flex gap-2 text-xs">
               <Button onClick={handleSignOut} size="sm" variant="ghost">
                  <p>로그아웃</p>
               </Button>
               <Button asChild size="sm">
                  <Link href={ROUTE_MYPAGE}>마이페이지</Link>
               </Button>
            </div>
         )}
      </section>
   )
}
