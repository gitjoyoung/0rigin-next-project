import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { User } from '@supabase/supabase-js'

export async function getUser(): Promise<User | null> {
   const supabase = await SupabaseServerClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()
   return user ?? null
}

export async function checkSignupCompleteServer(): Promise<{
   status: 'unauth' | 'authed' | 'needsProfile'
   user: User | null
   profile?: any
}> {
   const supabase = await SupabaseServerClient()

   const {
      data: { session },
   } = await supabase.auth.getSession()
   const { data: profile } = session
      ? await supabase
           .from('profile')
           .select('*')
           .eq('id', session.user.id)
           .maybeSingle()
      : { data: null }

   const initial = !session
      ? { status: 'unauth' as const, user: null }
      : profile?.is_active
        ? { status: 'authed' as const, user: session.user, profile }
        : { status: 'needsProfile' as const, user: session.user, profile }

   return initial
}
