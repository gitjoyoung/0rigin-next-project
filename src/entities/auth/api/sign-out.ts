// app/actions/auth.ts
'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { redirect } from 'next/navigation'

export async function signOut() {
   const supabase = await SupabaseServerClient()

   // 먼저 현재 세션 확인
   const {
      data: { user },
   } = await supabase.auth.getUser()

   // 세션이 있는 경우에만 로그아웃 처리
   if (user) {
      const { error } = await supabase.auth.signOut()
      if (error) {
         console.error('로그아웃 에러:', error)
      }
   }

   redirect('/')
}
