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

      // 사용자 인증 상태 확인
      supabase.auth.getUser().then(({ data: { user } }) => {
         if (user) {
            set({ user })
         }
      })

      // auth 상태 변경 구독
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event) => {
         if (event === 'SIGNED_IN') {
            const {
               data: { user },
            } = await supabase.auth.getUser()
            set({ user })
         } else if (event === 'SIGNED_OUT') {
            set({ user: null })
         }
      })

      return () => {
         subscription.unsubscribe()
      }
   },
}))
