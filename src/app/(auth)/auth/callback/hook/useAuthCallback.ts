'use client'

import { ROUTE_LOGIN, ROUTE_SIGN } from '@/constants/pathname'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

type CallbackStatus = 'loading' | 'redirecting' | 'error'

interface UseAuthCallbackReturn {
   status: CallbackStatus
   error: string | null
}

export const useAuthCallback = (): UseAuthCallbackReturn => {
   const [status, setStatus] = useState<CallbackStatus>('loading')
   const [error, setError] = useState<string | null>(null)

   const router = useRouter()
   const searchParams = useSearchParams()

   useEffect(() => {
      // OAuth 에러 확인
      const oauthError = searchParams.get('error')
      if (oauthError) {
         const message =
            oauthError === 'access_denied'
               ? '로그인이 취소되었습니다.'
               : '로그인 중 오류가 발생했습니다.'

         setError(message)
         setStatus('error')
         setTimeout(() => router.replace(ROUTE_LOGIN), 2000)
         return
      }

      // OAuth 성공 - 바로 프로필 확인 페이지로 이동
      // (세션은 이미 Supabase에 의해 설정됨)
      setStatus('redirecting')
      setTimeout(() => {
         // 프로필 존재 여부는 sign 페이지에서 확인
         router.replace(ROUTE_SIGN)
      }, 500)
   }, [router, searchParams])

   return { status, error }
}
