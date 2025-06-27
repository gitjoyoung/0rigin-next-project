import { getUserServer } from '@/entities/auth/api/get-user-server'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { PostLike } from '../types'

// 게시글 좋아요 토글
export async function togglePostLike(
   postId: number | string,
): Promise<{ isLiked: boolean; likeCount: number }> {
   const user = await getUserServer()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const supabase = await SupabaseServerClient()

   // 현재 좋아요 상태 확인
   const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

   if (existingLike) {
      // 좋아요 취소
      const { error: deleteError } = await supabase
         .from('post_likes')
         .delete()
         .eq('post_id', postId)
         .eq('user_id', user.id)

      if (deleteError) {
         throw new Error('좋아요 취소에 실패했습니다.')
      }
   } else {
      // 좋아요 추가
      const { error: insertError } = await supabase.from('post_likes').insert({
         post_id: postId as number,
         user_id: user.id,
      })

      if (insertError) {
         throw new Error('좋아요 추가에 실패했습니다.')
      }
   }

   // 업데이트된 좋아요 수 조회
   const { count: likeCount } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)

   return {
      isLiked: !existingLike,
      likeCount: likeCount || 0,
   }
}

// 게시글 좋아요 상태 확인
export async function checkPostLike(postId: number | string): Promise<boolean> {
   const user = await getUserServer()

   if (!user) {
      return false
   }

   const supabase = await SupabaseServerClient()

   const { data } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

   return !!data
}

// 게시글 좋아요 수 조회
export async function getPostLikeCount(
   postId: number | string,
): Promise<number> {
   const supabase = await SupabaseServerClient()

   const { count } = await supabase
      .from('post_likes')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)

   return count || 0
}

// 게시글 좋아요한 사용자 목록 조회
export async function getPostLikeUsers(
   postId: number | string,
   limit = 20,
   offset = 0,
): Promise<PostLike[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('post_likes')
      .select('*, user:profiles(id, nickname, avatar_url)')
      .eq('post_id', postId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error('좋아요한 사용자 목록을 불러올 수 없습니다.')
   }

   return data as PostLike[]
}

// 사용자가 좋아요한 게시글 목록 조회
export async function getUserLikedPosts(
   userId: string,
   limit = 20,
   offset = 0,
): Promise<PostLike[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('post_likes')
      .select('*, post:posts(id, title, content, category, created_at)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      throw new Error('사용자가 좋아요한 게시글 목록을 불러올 수 없습니다.')
   }

   return data as PostLike[]
}
