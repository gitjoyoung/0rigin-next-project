// shared/auth/AuthClientProvider.tsx
'use client'

import type { User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { SupabaseBrowserClient } from '../../shared/lib/supabase/supabase-browser-client'

// 인증 상태 타입
export type Status = 'loading' | 'unauth' | 'needsProfile' | 'authed'
export interface Snapshot {
   status: Status
   user: User | null
}

// 상태 Context
const AuthStateContext = createContext<Snapshot>({
   status: 'loading',
   user: null,
})
export const useAuthState = () => useContext(AuthStateContext)

// 액션 Context
const AuthActionContext = createContext<{ logout: () => Promise<void> }>({
   logout: async () => {},
})
export const useAuthActions = () => useContext(AuthActionContext)

export function AuthClientProvider({
   initial,
   children,
}: {
   initial: Snapshot
   children: React.ReactNode
}) {
   const supabase = SupabaseBrowserClient()
   const [snap, setSnap] = useState<Snapshot>({
      ...initial,
   })

   // 로그아웃 함수
   const logout = async () => {
      await supabase.auth.signOut()
      window.location.reload()
   }

   useEffect(() => {
      const sync = async () => {
         const {
            data: { session },
         } = await supabase.auth.getSession()
         if (!session) {
            setSnap({ status: 'unauth', user: null })
            return
         }
         const { data: profile } = await supabase
            .from('profile')
            .select('is_active')
            .eq('id', session.user.id)
            .maybeSingle()
         setSnap({
            status: profile?.is_active ? 'authed' : 'needsProfile',
            user: session.user,
         })
      }

      sync()
      const { data: sub } = supabase.auth.onAuthStateChange(() => {
         sync()
      })
      return () => sub.subscription.unsubscribe()
   }, [supabase])

   return (
      <AuthStateContext.Provider value={snap}>
         <AuthActionContext.Provider value={{ logout }}>
            {children}
         </AuthActionContext.Provider>
      </AuthStateContext.Provider>
   )
}
