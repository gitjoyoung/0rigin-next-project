'use client'

import { useAuthStore } from '@/store/authStore'
import { useEffect } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
   const { initializeAuth } = useAuthStore()
   useEffect(() => {
      const cleanup = initializeAuth()
      return cleanup
   }, [initializeAuth])

   return <>{children}</>
}
