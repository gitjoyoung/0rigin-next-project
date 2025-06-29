'use client'

import type { User } from '@supabase/supabase-js'
import { useQuery } from '@tanstack/react-query'

interface UseUserResponse {
   user: User | null
}

export function useUser() {
   return useQuery<UseUserResponse>({
      queryKey: ['user'],
      queryFn: async () => {
         const response = await fetch('/api/auth/user')
         if (!response.ok) {
            throw new Error('사용자 정보를 가져올 수 없습니다.')
         }
         return response.json()
      },
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분
   })
}
