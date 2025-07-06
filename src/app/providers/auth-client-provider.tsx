// shared/auth/AuthClientProvider.tsx
'use client'

import type { User } from '@supabase/supabase-js'
import { createContext, useContext, useEffect, useState } from 'react'
import { SupabaseBrowserClient } from '../../shared/lib/supabase/supabase-browser-client'

type Status = 'loading' | 'unauth' | 'needsProfile' | 'authed'
interface Snapshot {
   status: Status
   user: User | null
}

const AuthContext = createContext<Snapshot>({ status: 'loading', user: null })
export const useUser = () => useContext(AuthContext)

export function AuthClientProvider({
   initial,
   children,
}: {
   initial: Snapshot
   children: React.ReactNode
}) {
   const supabase = SupabaseBrowserClient()
   const [snap, setSnap] = useState<Snapshot>(initial)

   useEffect(() => {
      const sync = async () => {
         const {
            data: { session },
         } = await supabase.auth.getSession()
         if (!session) return setSnap({ status: 'unauth', user: null })

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

      sync() // 첫 확인
      const { data: sub } = supabase.auth.onAuthStateChange(() => sync()) // 토큰 이벤트마다
      return () => sub.subscription.unsubscribe()
   }, [supabase])

   return <AuthContext.Provider value={snap}>{children}</AuthContext.Provider>
}
