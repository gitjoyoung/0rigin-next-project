import { Database } from '@/shared/types'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import 'server-only'

export async function SupabaseServerClient() {
   // Next 15: 반드시 await
   const cookieStore = await cookies()

   return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            getAll: () => cookieStore.getAll(),
            setAll: (cookiesToSet) => {
               // 옵션까지 펼쳐서 전달
               cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set({ name, value, ...options }),
               )
            },
         },
         // cookieEncoding: 'none', // 필요 시 명시 (기본 none)
      },
   )
}
