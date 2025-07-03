'use client'

import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import { Icons } from '@/shared/ui/icons'

export default function GoogleLogin() {
   const handleGoogleLogin = async () => {
      try {
         const supabase = SupabaseBrowserClient()
         const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
               redirectTo: `${window.location.origin}/api/auth/callback`,
               queryParams: {
                  prompt: 'select_account',
               },
            },
         })

         if (error) {
            throw error
         }
      } catch (error) {
         console.error('구글 로그인 에러:', error)
      }
   }

   return (
      <Button
         variant="outline"
         className="w-full flex items-center justify-center gap-2"
         onClick={handleGoogleLogin}
      >
         <Icons.google className="w-5 h-5" />
         <span>Google로 계속하기</span>
      </Button>
   )
}
