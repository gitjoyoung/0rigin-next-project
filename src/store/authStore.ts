import { createClient } from '@/lib/supabase/client'
import { create } from 'zustand'

interface AuthState {
   user: any | null
   setUser: (user: any | null) => void
   initializeAuth: () => () => void
}

export const useAuthStore = create<AuthState>((set) => ({
   user: null,
   setUser: (user) => set({ user }),
   initializeAuth: () => {
      const supabase = createClient()

      // 쿠키 기반으로 세션 확인
      supabase.auth.getSession().then(({ data: { session } }) => {
         if (session?.user) {
            set({ user: session.user })
         }
      })

      // auth 상태 변경 구독
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange((event, session) => {
         set({ user: session?.user ?? null })
      })

      return () => {
         subscription.unsubscribe()
      }
   },
}))
