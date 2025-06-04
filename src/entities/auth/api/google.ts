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

// 구글 사용자인지 확인하는 서버 함수
export const checkIsGoogleUserServer = async (): Promise<boolean> => {
   const supabase = await SupabaseServerClient()

   const {
      data: { user },
      error,
   } = await supabase.auth.getUser()

   if (error || !user) {
      return false
   }

   // 구글 로그인 사용자는 app_metadata에 provider 정보가 있습니다
   return user.app_metadata?.providers?.includes('google') || false
}

// 클라이언트용 구글 사용자 확인 함수
export const checkIsGoogleUser = async (): Promise<boolean> => {
   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (!user) {
      return false
   }

   // 구글 로그인 사용자는 app_metadata에 provider 정보가 있습니다
   return user.app_metadata?.providers?.includes('google') || false
}

// 사용자의 프로필 정보가 존재하는지 확인 (서버용)
export const checkUserProfileExistsServer = async (): Promise<boolean> => {
   const supabase = await SupabaseServerClient()

   const {
      data: { user },
      error,
   } = await supabase.auth.getUser()

   if (error || !user) {
      return false
   }

   const { data: profile } = await supabase
      .from('profile')
      .select('id')
      .eq('id', user.id)
      .single()

   return !!profile
}

// 사용자의 프로필 정보가 존재하는지 확인 (클라이언트용)
export const checkUserProfileExists = async (): Promise<boolean> => {
   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (!user) {
      return false
   }

   const { data: profile } = await supabase
      .from('profile')
      .select('id')
      .eq('id', user.id)
      .single()

   return !!profile
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
      .from('profile')
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

   // 1️⃣ 로그인된 세션이 없으면 false
   if (error || !user) {
      return false
   }

   const { data: profile, error: profileError } = await supabase
      .from('profile')
      .select('*')
      .eq('id', user.id)
      .single()

   // 2️⃣ profile 조회 중 에러가 있거나 데이터가 없으면 false
   if (profileError || !profile) {
      return false
   }

   return true
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
      .from('profile')
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
      .from('profile')
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
      .from('profile')
      .select('signup_complete')
      .eq('id', user.id)
      .single()

   return {
      isLoggedIn: true,
      isSignupComplete: profile?.signup_complete ?? false,
   }
}
