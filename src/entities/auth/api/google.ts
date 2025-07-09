'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { redirect } from 'next/navigation'

export async function signInWithGoogle({ next }: { next: string }) {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
         redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/callback`,
         queryParams: { prompt: 'select_account' },
      },
   })

   if (error) {
      console.error(error)
      return
   }
   console.log('콜백 호출 성공', data)

   if (data.url) {
      redirect(data.url)
   }
}
