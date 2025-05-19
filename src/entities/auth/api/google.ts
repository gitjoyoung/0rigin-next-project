import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'

const supabase = SupabaseBrowserClient()

export const googleLogin = async () => {
   const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
         redirectTo: `${window.location.origin}/auth/callback`,
         queryParams: {
            access_type: 'offline',
            prompt: 'consent',
         },
      },
   })

   return { data, error }
}

// 프로필의 signup_complete 상태 확인 (미들웨어 & 콜백용)
export const checkSignupComplete = async () => {
   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (!user) {
      return false
   }

   const { data: profile } = await supabase
      .from('profiles')
      .select('signup_complete')
      .eq('id', user.id)
      .single()

   return profile?.signup_complete || false
}

// 서버 컴포넌트용 프로필의 signup_complete 상태 확인
export async function checkSignupCompleteServer() {
   const supabase = await SupabaseServerClient()
   const {
      data: { user },
      error,
   } = await supabase.auth.getUser()

   if (error || !user) {
      return false
   }

   const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

   return !!profile
}

// 미들웨어용 회원가입 상태 확인
export const checkSignupCompleteMiddleware = async (supabase: any) => {
   const {
      data: { user },
      error,
   } = await supabase.auth.getUser()

   if (error || !user) {
      return false
   }

   const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

   return !!profile
}

export const checkGoogleLoginStatus = async () => {
   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (!user) {
      return { isLoggedIn: false, isSignupComplete: false }
   }

   const { data: profile } = await supabase
      .from('profiles')
      .select('signup_complete')
      .eq('id', user.id)
      .single()

   return {
      isLoggedIn: true,
      isSignupComplete: profile?.signup_complete ?? false,
   }
}

export const checkGoogleLoginStatusServer = async () => {
   const supabase = await SupabaseServerClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (!user) {
      return { isLoggedIn: false, isSignupComplete: false }
   }

   const { data: profile } = await supabase
      .from('profiles')
      .select('signup_complete')
      .eq('id', user.id)
      .single()

   return {
      isLoggedIn: true,
      isSignupComplete: profile?.signup_complete ?? false,
   }
}
