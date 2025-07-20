import { getUser } from '@/entities/auth/api/get-user'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import {
   CreateProfileRequest,
   Profile,
   ProfileDetail,
   ProfileSearchResult,
   ProfileStats,
   UpdateProfileRequest,
} from '../types'

// 프로필 조회
export async function getProfile(): Promise<Profile | null> {
   const user = await getUser()

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
      return null
   }

   return { ...data, email: user.email ?? '' } as Profile
}

// 프로필 상세 조회 (통계 포함)
export async function getProfileDetail(): Promise<ProfileDetail | null> {
   const user = await getUser()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const supabase = await SupabaseServerClient()

   // 프로필 기본 정보 조회
   const { data: profile, error: profileError } = await supabase
      .from('profile')
      .select('*')
      .eq('id', user.id)
      .single()

   if (profileError) {
      throw new Error('프로필 정보를 불러올 수 없습니다.')
   }

   if (!profile) return null

   // 프로필 통계 조회
   const stats = await getProfileStats(user.id)

   return {
      ...profile,
      stats,
   }
}

// 프로필 통계 조회
export async function getProfileStats(userId: string): Promise<ProfileStats> {
   const supabase = await SupabaseServerClient()

   // 게시글 수 조회
   const { count: totalPosts } = await supabase
      .from('posts')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId)

   // 좋아요 수 조회
   const { count: totalLikes } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)

   // 댓글 수 조회
   const { count: totalComments } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('author_id', userId)

   // 마지막 활동 시간 조회
   const { data: lastActivity } = await supabase
      .from('profile')
      .select('last_login_at, created_at')
      .eq('id', userId)
      .single()

   return {
      total_posts: totalPosts || 0,
      total_likes: totalLikes || 0,
      total_comments: totalComments || 0,
      join_date: lastActivity?.created_at || '',
      last_activity: lastActivity?.last_login_at || '',
   }
}

// 프로필 업데이트
export async function updateProfile(
   updateData: UpdateProfileRequest,
): Promise<void> {
   const user = await getUser()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const supabase = await SupabaseServerClient()
   const { error } = await supabase
      .from('profile')
      .update(updateData)
      .eq('id', user.id)

   if (error) {
      throw new Error('프로필 업데이트에 실패했습니다.')
   }
}

// 프로필 생성
export async function createProfile(
   profileData: CreateProfileRequest,
): Promise<Profile> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('profile')
      .insert(profileData)
      .select()
      .single()

   if (error) {
      throw new Error('프로필 생성에 실패했습니다.')
   }

   return data as Profile
}

// 프로필 검색
export async function searchProfiles(
   keyword: string,
   limit = 10,
   offset = 0,
): Promise<{ data: ProfileSearchResult[]; count: number }> {
   const supabase = await SupabaseServerClient()

   // 전체 개수 조회
   const { count } = await supabase
      .from('profile')
      .select('*', { count: 'exact', head: true })
      .or(`nickname.ilike.%${keyword}%,bio.ilike.%${keyword}%`)
      .eq('is_active', true)

   // 검색 결과 조회
   const { data, error } = await supabase
      .from('profile')
      .select('id, nickname, avatar_url, bio, created_at')
      .or(`nickname.ilike.%${keyword}%,bio.ilike.%${keyword}%`)
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error('프로필 검색에 실패했습니다.')
   }

   return {
      data: data as ProfileSearchResult[],
      count: count || 0,
   }
}

// 프로필 삭제 (필요시)
export async function deleteProfile(): Promise<void> {
   const user = await getUser()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const supabase = await SupabaseServerClient()
   const { error } = await supabase.from('profile').delete().eq('id', user.id)

   if (error) {
      throw new Error('프로필 삭제에 실패했습니다.')
   }
}
