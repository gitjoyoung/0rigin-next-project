'use client'

import { signOut } from '@/shared/actions/auth-action'
import { Button } from '@/shared/shadcn/ui/button'
import { redirect } from 'next/navigation'

export function LogoutButton() {
   const handleSignOut = async () => {
      await signOut()
      redirect('/')
   }

   return (
      <Button
         onClick={handleSignOut}
         className="dark:bg-white bg-black text-white dark:text-black"
         size="sm"
         variant="outline"
      >
         <p>로그아웃</p>
      </Button>
   )
}
