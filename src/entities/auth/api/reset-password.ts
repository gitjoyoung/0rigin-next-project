'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { AuthResponse } from '../types/common'
import { handleTryCatch } from './try-catch'

export const resetPassword = async (email: string): Promise<AuthResponse> => {
   return handleTryCatch(async () => {
      const supabase = await SupabaseServerClient()

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
         redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
      })

      if (error) {
         return { success: false, message: error.message }
      }

      return {
         success: true,
         message: '비밀번호 재설정 이메일을 확인해주세요.',
      }
   }, '비밀번호 재설정 처리 중 오류가 발생했습니다.')
}
