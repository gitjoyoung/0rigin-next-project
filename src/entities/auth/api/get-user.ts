import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { User } from '@supabase/supabase-js'

// 클라이언트 사이드에서 사용자 정보를 가져오는 함수
export async function getUser(): Promise<User | null> {
   const supabase = await SupabaseServerClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user
}
