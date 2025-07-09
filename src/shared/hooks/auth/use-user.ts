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
         const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + '/api/auth/user',
         )
         return await response.json()
      },
   })
}
