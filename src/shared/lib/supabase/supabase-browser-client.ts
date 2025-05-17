import { createBrowserClient } from '@supabase/ssr'

// 브라우저 컴포넌트에서 사용하는 함수
export function SupabaseBrowserClient() {
   return createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
   )
}
