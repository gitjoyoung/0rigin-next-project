'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'

// 인증 관련 응답 타입 정의
export type TAuthResponse<T = any> =
   | { success: true; data: T; message?: string }
   | { success: false; error: string; code?: string }

// 타입 정의
export interface LoginParams {
   email: string
   password: string
}

export interface SignUpParams {
   email: string
   password: string
   nickname: string
   gender: string
}

// 에러 처리 유틸리티 함수
const handleError = (
   error: unknown,
   defaultMessage: string,
): TAuthResponse<never> => {
   return {
      success: false,
      error: error instanceof Error ? error.message : defaultMessage,
   }
}

// 성공 응답 유틸리티 함수
const successResponse = <T>(data: T, message?: string): TAuthResponse<T> => {
   return { success: true, data, message }
}

// 서버 액션 래퍼 함수
const withErrorHandling = async <T>(
   actionFn: () => Promise<TAuthResponse<T>>,
   errorMessage: string,
): Promise<TAuthResponse<T>> => {
   try {
      return await actionFn()
   } catch (error) {
      return handleError(error, errorMessage)
   }
}

export async function auth(): Promise<TAuthResponse<{ user: any }>> {
   return withErrorHandling(async () => {
      const supabase = await SupabaseServerClient()
      const {
         data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
         return { success: false, error: '인증된 사용자가 없습니다.' }
      }

      return successResponse({ user })
   }, '인증 처리 중 오류가 발생했습니다.')
}

export const Login = async (
   params: LoginParams,
): Promise<TAuthResponse<{ user: any }>> => {
   // 인자 유효성 검사
   if (!params.email) {
      return {
         success: false,
         error: '이메일을 입력해주세요.',
         code: 'MISSING_EMAIL',
      }
   }
   if (!params.password) {
      return {
         success: false,
         error: '비밀번호를 입력해주세요.',
         code: 'MISSING_PASSWORD',
      }
   }

   return withErrorHandling(async () => {
      const supabase = await SupabaseServerClient()
      const { error } = await supabase.auth.signInWithPassword({
         email: params.email,
         password: params.password,
      })

      if (error) {
         return { success: false, error: error.message }
      }

      const {
         data: { user },
      } = await supabase.auth.getUser()
      return successResponse({ user }, '로그인 성공')
   }, '로그인 처리 중 오류가 발생했습니다.')
}

export const signUp = async (
   params: SignUpParams,
): Promise<TAuthResponse<{ user: any }>> => {
   // 인자 유효성 검사
   if (!params.email) {
      return {
         success: false,
         error: '이메일을 입력해주세요.',
         code: 'MISSING_EMAIL',
      }
   }
   if (!params.password) {
      return {
         success: false,
         error: '비밀번호를 입력해주세요.',
         code: 'MISSING_PASSWORD',
      }
   }
   if (!params.nickname) {
      return {
         success: false,
         error: '닉네임을 입력해주세요.',
         code: 'MISSING_NICKNAME',
      }
   }
   if (!params.gender) {
      return {
         success: false,
         error: '성별을 선택해주세요.',
         code: 'MISSING_GENDER',
      }
   }

   return withErrorHandling(async () => {
      const supabase = await SupabaseServerClient()
      const { error } = await supabase.auth.signUp({
         email: params.email,
         password: params.password,
         options: {
            data: {
               nickname: params.nickname,
               gender: params.gender,
            },
         },
      })

      if (error) {
         return { success: false, error: error.message }
      }

      const {
         data: { user },
      } = await supabase.auth.getUser()
      return successResponse({ user }, '회원가입 성공')
   }, '회원가입 처리 중 오류가 발생했습니다.')
}

export const signOut = async (): Promise<TAuthResponse<null>> => {
   return withErrorHandling(async () => {
      const supabase = await SupabaseServerClient()
      const { error } = await supabase.auth.signOut()

      if (error) {
         return { success: false, error: error.message }
      }

      return successResponse(null, '로그아웃 성공')
   }, '로그아웃 처리 중 오류가 발생했습니다.')
}

export const resetPassword = async (
   formData: FormData,
): Promise<TAuthResponse<null>> => {
   return withErrorHandling(async () => {
      const email = formData.get('email') as string

      if (!email) {
         return {
            success: false,
            error: '이메일을 입력해주세요.',
            code: 'MISSING_EMAIL',
         }
      }

      const supabase = await SupabaseServerClient()

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
      })

      if (error) {
         return { success: false, error: error.message }
      }

      return successResponse(null, '비밀번호 재설정 이메일을 확인해주세요.')
   }, '비밀번호 재설정 처리 중 오류가 발생했습니다.')
}

export const updatePassword = async (
   formData: FormData,
): Promise<TAuthResponse<null>> => {
   return withErrorHandling(async () => {
      const password = formData.get('password') as string

      if (!password) {
         return {
            success: false,
            error: '새 비밀번호를 입력해주세요.',
            code: 'MISSING_PASSWORD',
         }
      }

      const supabase = await SupabaseServerClient()

      const { error } = await supabase.auth.updateUser({
         password,
      })

      if (error) {
         return { success: false, error: error.message }
      }

      return successResponse(null, '비밀번호가 변경되었습니다.')
   }, '비밀번호 변경 중 오류가 발생했습니다.')
}

export async function getUser(): Promise<TAuthResponse<{ user: any }>> {
   return withErrorHandling(async () => {
      const supabase = await SupabaseServerClient()
      const {
         data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
         return { success: false, error: '사용자 정보를 찾을 수 없습니다.' }
      }

      return successResponse({ user })
   }, '사용자 정보 조회 중 오류가 발생했습니다.')
}
