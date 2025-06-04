'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { AuthResponse } from '../types/common'
import { SignUpParamsSchema, type SignUpParams } from '../types/sign-up'

export const signUp = async ({
   email,
   password,
   confirmPassword,
   nickname,
   gender,
}: SignUpParams): Promise<AuthResponse> => {
   try {
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

      // 1. Supabase Auth에 사용자 생성 (메타데이터 없이)
      const { data: authData, error: authError } = await supabase.auth.signUp({
         email: validatedData.email,
         password: validatedData.password,
      })

      if (authError) {
         return { success: false, message: authError.message }
      }

      // 2. 생성된 사용자 ID로 profile 테이블에 프로필 정보 저장
      if (authData.user) {
         const { error: profileError } = await supabase.from('profile').insert({
            id: authData.user.id,
            email: validatedData.email,
            nickname: validatedData.nickname,
            gender: validatedData.gender,
            signup_complete: true,
         })

         if (profileError) {
            // 프로필 생성 실패 시 생성된 사용자 삭제 (롤백)
            await supabase.auth.admin.deleteUser(authData.user.id)
            return { success: false, message: '프로필 생성에 실패했습니다.' }
         }
      }

      return { success: true, message: '회원가입이 완료되었습니다!' }
   } catch (error) {
      return {
         success: false,
         message: '회원가입 처리 중 오류가 발생했습니다.',
      }
   }
}
