'use server'

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { AuthResponse } from '../types/common'
import { type SignUpParams } from '../types/sign-up'

export const signUp = async ({
   email,
   password,
   nickname,
   gender,
}: SignUpParams): Promise<AuthResponse> => {
   const supabase = await SupabaseServerClient()

   // 회원가입(메타데이터 포함)
   const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
         data: {
            display_name: nickname,
            nickname,
            gender,
         },
      },
   })

   if (authError) {
      return { success: false, message: 'authError: ' + authError.message }
   }

   // profile은 트리거로 자동 생성됨
   return { success: true, message: '회원가입이 완료되었습니다!' }
}
