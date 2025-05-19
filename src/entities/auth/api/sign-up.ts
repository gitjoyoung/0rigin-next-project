'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { AuthResponse } from '../types/common'
import { SignUpParamsSchema, type SignUpParams } from '../types/sign-up'
import { handleTryCatch } from './try-catch'

export const signUp = async ({
   email,
   password,
   confirmPassword,
   nickname,
   gender,
}: SignUpParams): Promise<AuthResponse> => {
   return handleTryCatch(async () => {
      // zod로 유효성 검사
      const result = SignUpParamsSchema.safeParse({
         email,
         password,
         confirmPassword,
         nickname,
         gender,
      })

      if (!result.success) {
         return {
            success: false,
            message:
               result.error.errors[0]?.message ||
               '입력 정보가 올바르지 않습니다.',
         }
      }

      const validatedData = result.data
      const supabase = await SupabaseServerClient()
      const { error } = await supabase.auth.signUp({
         email: validatedData.email,
         password: validatedData.password,
         options: {
            data: {
               nickname: validatedData.nickname,
               gender: validatedData.gender,
               signup_complete: true,
            },
         },
      })

      if (error) {
         return { success: false, message: error.message }
      }

      return { success: true, message: '회원가입 성공' }
   }, '회원가입 처리 중 오류가 발생했습니다.')
}
