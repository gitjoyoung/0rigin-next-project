import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { PostLike, PostLikeCreate } from '../types'

// 게시글 좋아요 조회 (특정 사용자/익명키)
export async function getPostLike(
   postId: number,
   userId?: string,
   anonKey?: string,
): Promise<PostLike | null> {
   const supabase = await SupabaseServerClient()

   if (!userId && !anonKey) {
      return null
   }

   let query = supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId)
      .is('deleted_at', null)

   if (userId) {
      query = query.eq('user_id', userId)
   } else if (anonKey) {
      query = query.eq('anon_key', anonKey)
   }

   const { data, error } = await query.single()

   if (error && error.code !== 'PGRST116') {
      throw error
   }

   return data || null
}

// 게시글 좋아요 목록 조회
export async function getPostLikes(
   postId: number,
   limit = 50,
): Promise<PostLike[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(limit)

   if (error) throw error
   return data || []
}

// 게시글 좋아요 개수 조회
export async function getPostLikeCount(
   postId: string | number,
): Promise<number> {
   const supabase = await SupabaseServerClient()

   const { count, error } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', Number(postId))
      .is('deleted_at', null)

   if (error) throw error
   return count || 0
}

// 사용자가 좋아요한 게시글 목록 조회
export async function getUserLikedPosts(
   userId: string,
   limit = 100,
): Promise<PostLike[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('post_likes')
      .select('*')
      .eq('user_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(limit)

   if (error) throw error
   return data || []
}

// 게시글 좋아요 생성
export async function createPostLike(data: PostLikeCreate): Promise<PostLike> {
   const supabase = await SupabaseServerClient()

   const { data: result, error } = await supabase
      .from('post_likes')
      .insert(data)
      .select('*')
      .single()

   if (error) throw error
   return result
}

// 게시글 좋아요 삭제 (soft delete)
export async function deletePostLike(id: string): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { error } = await supabase
      .from('post_likes')
      .update({ deleted_at: new Date().toISOString() })
      .eq('id', id)

   if (error) throw error
}
