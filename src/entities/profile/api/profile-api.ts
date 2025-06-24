import { getUserServer } from '@/entities/auth/api/get-user-server'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'

export type Profile = {
   id: string
   email: string
   nickname: string
   gender: string
   avatar_url?: string | null
   bio?: string | null
   is_email_verified: boolean
   signup_complete: boolean
   is_active: boolean
   created_at: string
   updated_at: string
   last_login_at?: string | null
}

// 프로필 조회
export async function getProfile(): Promise<Profile> {
   const user = await getUserServer()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const supabase = await SupabaseServerClient()
   const { data, error } = await supabase
      .from('profile')
      .select('*')
      .eq('id', user.id)
      .single()

   if (error) {
      throw new Error('프로필 정보를 불러올 수 없습니다.')
   }

   return data as Profile
}

// 프로필 업데이트
export async function updateProfile({
   nickname,
   gender,
}: {
   nickname: string
   gender: string
}): Promise<void> {
   const user = await getUserServer()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const supabase = await SupabaseServerClient()
   const { error } = await supabase
      .from('profile')
      .update({ nickname, gender })
      .eq('id', user.id)

   if (error) {
      throw new Error('프로필 업데이트에 실패했습니다.')
   }
}

// 프로필 삭제 (필요시)
export async function deleteProfile(): Promise<void> {
   const user = await getUserServer()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const supabase = await SupabaseServerClient()
   const { error } = await supabase.from('profile').delete().eq('id', user.id)

   if (error) {
      throw new Error('프로필 삭제에 실패했습니다.')
   }
}
