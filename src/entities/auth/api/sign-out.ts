import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { handleTryCatch } from './try-catch'

export const signOut = async (): Promise<any> => {
   return handleTryCatch(async () => {
      const supabase = await SupabaseBrowserClient()
      const { error } = await supabase.auth.signOut()

      console.log('서버 로그아웃 호출')
      if (error) {
         console.error('서버 로그아웃 에러:', error)
         return { success: false, message: error.message }
      }

      console.log('서버 로그아웃 성공')
      return { success: true, message: '로그아웃 성공' }
   }, '로그아웃 처리 중 오류가 발생했습니다.')
}
