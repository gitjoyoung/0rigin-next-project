import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { User } from '@supabase/supabase-js'

export async function getUser(): Promise<User> {
   const supabase = await SupabaseServerClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user
}
