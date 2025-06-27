'use client'

import { useQuery } from '@tanstack/react-query'

interface UseSignupStatusResponse {
   isSignupComplete: boolean
}

export function useSignupStatus() {
   return useQuery<UseSignupStatusResponse>({
      queryKey: ['auth', 'signup-status'],
      queryFn: async () => {
         const response = await fetch('/api/auth/signup-status')

         if (!response.ok) {
            throw new Error('회원가입 상태를 확인할 수 없습니다.')
         }

         return response.json()
      },
      staleTime: 30 * 1000, // 30초
      gcTime: 60 * 1000, // 1분
   })
}
