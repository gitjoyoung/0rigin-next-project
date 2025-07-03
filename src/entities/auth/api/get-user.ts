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

export async function checkSignupCompleteServer(): Promise<{
   status: 'unauth' | 'authed' | 'needsProfile'
   user: User | null
}> {
   const supabase = await SupabaseServerClient()

   const {
      data: { session },
   } = await supabase.auth.getSession()
   const { data: profile } = session
      ? await supabase
           .from('profile')
           .select('is_active')
           .eq('id', session.user.id)
           .maybeSingle()
      : { data: null }

   const initial = !session
      ? { status: 'unauth' as const, user: null }
      : profile?.is_active
        ? { status: 'authed' as const, user: session.user }
        : { status: 'needsProfile' as const, user: session.user }

   return initial
}
