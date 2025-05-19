import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { handleTryCatch } from './try-catch'

export const signOut = async (): Promise<any> => {
   return handleTryCatch(async () => {
      const supabase = await SupabaseServerClient()
      const { error } = await supabase.auth.signOut()

      if (error) {
         throw error
      }

      return {
         success: true,
         message: '로그아웃이 완료되었습니다.',
      }
   }, '로그아웃 처리 중 오류가 발생했습니다.')
}
