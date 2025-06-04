import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { User } from '@supabase/supabase-js'

// 서버 컴포넌트용 getUser 함수
export async function getUserServer(): Promise<User | null> {
   const supabase = await SupabaseServerClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user
}
