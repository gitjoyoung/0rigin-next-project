import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type { Tables } from '@/shared/types'
import type { PostLike, PostLikeCreate } from '../types'

// 게시글 좋아요 조회 (특정 사용자/익명키)
export async function getPostLike(
   postId: number,
   anonKey: string,
   isAuthenticated: boolean,
): Promise<PostLike | null> {
   const supabase = await SupabaseServerClient()

   const { data } = await supabase
      .from('post_likes')
      .select('*')
      .eq('post_id', postId)
      .eq(isAuthenticated ? 'user_id' : 'anon_key', anonKey)
      .is('deleted_at', null)
      .single()

   return data || null
}

// 게시글 좋아요 개수 조회
export async function getPostLikeCount(
   postId: number,
): Promise<Tables<'post_likes'>[]> {
   const supabase = await SupabaseServerClient()

   const { data, count, error } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact' })
      .eq('post_id', postId)
      .is('deleted_at', null)

   if (error) throw error
   return data
}

// 게시글 좋아요 생성
export async function createPostLike(data: PostLikeCreate): Promise<PostLike> {
   const supabase = await SupabaseServerClient()

   const { post_id, anon_key, authenticated } = data
   const postData = {
      post_id: post_id,
      [authenticated ? 'user_id' : 'anon_key']: anon_key,
   }
   const { data: result, error } = await supabase
      .from('post_likes')
      .insert(postData)
      .select('*')
      .single()

   if (error) throw error
   return result
}

// 게시글 좋아요 삭제 (soft delete)
export async function deletePostLike(data: PostLikeCreate): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { post_id, anon_key, authenticated } = data

   const { error } = await supabase
      .from('post_likes')
      .update({ deleted_at: new Date().toISOString() })
      .eq('post_id', post_id)
      .eq(authenticated ? 'user_id' : 'anon_key', anon_key)

   if (error) throw error
}
