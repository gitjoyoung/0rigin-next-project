'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { AuthResponse } from '../types/common'
import { LoginParamsSchema, type LoginParams } from '../types/login'
import { handleTryCatch } from './auth-utils'

export const signIn = async (params: LoginParams): Promise<AuthResponse> => {
   return handleTryCatch(async () => {
      // zod로 유효성 검사
      const result = LoginParamsSchema.safeParse(params)
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
      const { error } = await supabase.auth.signInWithPassword({
         email: validatedData.email,
         password: validatedData.password,
      })

      if (error) {
         return { success: false, message: error.message }
      }

      return { success: true, message: '로그인 성공' }
   }, '로그인 처리 중 오류가 발생했습니다.')
}
