import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { AuthResponse } from '../types/common'
import { handleTryCatch } from './auth-utils'

export const updatePassword = async (
   password: string,
): Promise<AuthResponse> => {
   return handleTryCatch(async () => {
      const supabase = await SupabaseServerClient()

      const { error } = await supabase.auth.updateUser({
         password,
      })

      if (error) {
         return { success: false, message: error.message }
      }

      return { success: true, message: '비밀번호가 변경되었습니다.' }
   }, '비밀번호 변경 중 오류가 발생했습니다.')
}
