/**
 * @description 서버 사이드 전용 Google Auth API
 * 이 파일의 함수들은 서버 컴포넌트에서만 사용 가능합니다.
 * 클라이언트에서 사용하려면 API 라우트를 통해 접근해야 합니다.
 */

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'

/**
 * 현재 로그인된 사용자가 Google OAuth를 통해 로그인했는지 확인
 * @returns {Promise<boolean>} Google 로그인 여부
 */
export async function checkIsGoogleUserServer(): Promise<boolean> {
   try {
      const supabase = await SupabaseServerClient()
      const {
         data: { user },
         error,
      } = await supabase.auth.getUser()

      if (error || !user) {
         return false
      }

      // OAuth 제공자 확인
      return user.app_metadata?.provider === 'google' || false
   } catch (error) {
      console.error('Google 사용자 확인 중 오류:', error)
      return false
   }
}

// 사용자의 프로필 정보가 존재하는지 확인 (서버용)
export async function checkUserProfileExistsServer(): Promise<boolean> {
   try {
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
   } catch (error) {
      console.error('프로필 존재 확인 중 오류:', error)
      return false
   }
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

export async function checkGoogleLoginStatusServer() {
   try {
      const supabase = await SupabaseServerClient()
      const {
         data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
         return { isLoggedIn: false, isSignupComplete: false }
      }

      const { data: profile, error: profileError } = await supabase
         .from('profile')
         .select('*')
         .eq('id', user.id)
         .single()

      // 프로필이 존재하면 회원가입이 완료된 것으로 간주
      const isSignupComplete = !profileError && !!profile

      const result = {
         isLoggedIn: true,
         isSignupComplete,
      }

      return result
   } catch (error) {
      return { isLoggedIn: false, isSignupComplete: false }
   }
}
