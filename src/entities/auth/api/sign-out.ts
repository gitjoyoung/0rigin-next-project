import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { AuthResponse } from '../types/common'
import { handleTryCatch } from './auth-utils'

export const signOut = async (): Promise<AuthResponse> => {
   return handleTryCatch(async () => {
      const supabase = await SupabaseServerClient()
      const { error } = await supabase.auth.signOut()
      if (error) {
         return { success: false, message: error.message }
      }
      return { success: true, message: '로그아웃 성공' }
   }, '로그아웃 처리 중 오류가 발생했습니다.')
}
