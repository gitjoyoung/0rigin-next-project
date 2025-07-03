'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { z } from 'zod'
import type { AuthResponse } from '../types/common'
import { genderSchema, nicknameSchema } from '../types/common'
import { handleTryCatch } from './try-catch'

// 구글 사용자 전용 스키마 (닉네임과 성별만)
const GoogleProfileSchema = z.object({
   nickname: nicknameSchema,
   gender: genderSchema,
})

export interface GoogleProfileParams {
   nickname: string
   gender: 'man' | 'women' | 'etc'
}

// 구글 로그인 사용자의 프로필 생성
export const createGoogleProfileAddServer = async ({
   nickname,
   gender,
}: GoogleProfileParams): Promise<AuthResponse> => {
   return handleTryCatch(async () => {
      console.log('구글 프로필 생성 시작')
      // 구글 사용자 전용 검증 (닉네임, 성별만)
      const result = GoogleProfileSchema.safeParse({
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

      const {
         data: { user },
         error: userError,
      } = await supabase.auth.getUser()

      if (userError || !user) {
         return { success: false, message: '사용자 인증에 실패했습니다.' }
      }

      const insertData = {
         id: user.id,
         email: user.email,
         nickname: validatedData.nickname,
         gender: validatedData.gender,
         signup_complete: true,
         is_active: true,
      }

      // profiles 테이블에 레코드 생성
      const { error: insertError } = await supabase
         .from('profile')
         .insert(insertData)

      if (insertError) {
         return {
            success: false,
            message: '프로필 생성에 실패했습니다.' + insertError.message,
         }
      }

      return { success: true, message: '프로필 생성 완료' }
   }, '프로필 생성 처리 중 오류가 발생했습니다.')
}
