import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import type { User } from '@supabase/supabase-js'

export async function getUser(): Promise<User> {
   const supabase = await SupabaseBrowserClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user
}
