'use client'

import { ROUTE_LOGIN, ROUTE_SIGN } from '@/constants/pathname'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type CallbackStatus = 'loading' | 'redirecting'

export const useAuthCallback = () => {
   const [status, setStatus] = useState<CallbackStatus>('loading')
   const router = useRouter()
   const searchParams = useSearchParams()
   const supabase = SupabaseBrowserClient()

   useEffect(() => {
      const handleCallback = async () => {
         // OAuth 에러 확인
         const error = searchParams.get('error')
         if (error) {
            const message =
               error === 'access_denied'
                  ? '로그인이 취소되었습니다.'
                  : '로그인 중 오류가 발생했습니다.'
            router.replace(ROUTE_LOGIN + `?message=${message}`)
            return
         }

         setStatus('redirecting')

         // 회원가입 완료 상태 확인
         const {
            data: { user },
         } = await supabase.auth.getUser()
         if (!user) {
            router.replace(ROUTE_LOGIN)
            return
         }

         const { data: profile } = await supabase
            .from('profile')
            .select('signup_complete')
            .eq('id', user.id)
            .single()

         const isSignupComplete = profile?.signup_complete || false

         router.replace(isSignupComplete ? '/' : ROUTE_SIGN)
      }

      handleCallback()
   }, [router, searchParams, supabase])

   return { status }
}
