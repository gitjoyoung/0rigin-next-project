import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { User } from '@supabase/supabase-js'

// 클라이언트 컴포넌트용 getUser 함수
export async function getUser(): Promise<User | null> {
   const supabase = SupabaseBrowserClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user
}

// 서버 컴포넌트용 getUser 함수
export async function getUserServer(): Promise<User | null> {
   const supabase = await SupabaseServerClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user
}
