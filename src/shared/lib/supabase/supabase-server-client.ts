import { Database } from '@/shared/types'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import 'server-only'

export async function SupabaseServerClient() {
   const cookieStore = await cookies()

   return createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
         cookies: {
            getAll: () => cookieStore.getAll(),
            setAll: (cookiesToSet) => {
               // Next.js 15에서는 쿠키 설정이 제한적
               // Server Action이나 Route Handler에서만 쿠키 설정 가능
               try {
                  cookiesToSet.forEach(({ name, value, options }) =>
                     cookieStore.set({ name, value, ...options }),
                  )
               } catch (error) {
                  // 읽기 전용 컨텍스트에서는 쿠키 설정 무시
                  console.warn(
                     'Cookie setting attempted in read-only context:',
                     error,
                  )
               }
            },
         },
      },
   )
}
