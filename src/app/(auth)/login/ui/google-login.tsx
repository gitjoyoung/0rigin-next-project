'use client'

import { signInWithGoogle } from '@/entities/auth/api/google'
import { Button } from '@/shared/shadcn/ui/button'
import { Icons } from '@/shared/ui/icons'

export default function GoogleLogin() {
   return (
      <form action={async () => signInWithGoogle({ next: '/' })}>
         <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
         >
            <Icons.google className="w-5 h-5" />
            <span>Google로 계속하기</span>
         </Button>
      </form>
   )
}
