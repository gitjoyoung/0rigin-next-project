'use client'

import {
   useAuthActions,
   useAuthState,
} from '@/app/providers/auth-client-provider'
import { ROUTE_LOGIN, ROUTE_MY_PAGE, ROUTE_SIGN } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

function MenuButton(props: React.ComponentProps<typeof Button>) {
   return (
      <Button
         size="sm"
         variant="outline"
         className="dark:bg-white bg-black text-white dark:text-black"
         {...props}
      />
   )
}

export default function AuthButtons() {
   const { status, user } = useAuthState()
   const { logout } = useAuthActions()

   if (status === 'loading') {
      return (
         <div className="flex gap-2">
            <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
         </div>
      )
   }

   if (status === 'unauth') {
      return (
         <nav className="flex gap-2 text-xs">
            <MenuButton asChild>
               <Link href={ROUTE_LOGIN}>로그인</Link>
            </MenuButton>
            <MenuButton variant="outline" asChild>
               <Link href={ROUTE_SIGN}>회원가입</Link>
            </MenuButton>
         </nav>
      )
   }

   return (
      <nav className="flex gap-2 text-xs">
         <MenuButton onClick={logout}>로그아웃</MenuButton>
         <MenuButton asChild>
            <Link href={ROUTE_MY_PAGE}>마이페이지</Link>
         </MenuButton>
      </nav>
   )
}
