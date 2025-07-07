'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { redirect } from 'next/navigation'

export async function signInWithGoogle({ next }: { next: string }) {
   const supabase = await SupabaseServerClient()

   // 현재 환경에 맞는 베이스 URL 설정

   const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
         redirectTo: `${process.env.NEXT_PUBLIC_API_URL}/callback`,
         queryParams: { prompt: 'select_account' },
      },
   })

   if (data.url) {
      redirect(data.url) // Google → Supabase → callback
   }
}
