/**
 * @description 서버 사이드 전용 Comment API
 * 이 파일의 함수들은 서버 컴포넌트에서만 사용 가능합니다.
 * 클라이언트에서 사용하려면 API 라우트를 통해 접근해야 합니다.
 */

import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import {
   Comment,
   CommentCreate,
   CommentQueryParams,
   CommentUpdate,
} from '../types'

// 댓글 목록 조회
export async function getComments(postId: number | string): Promise<Comment[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true })

   if (error) {
      console.error('댓글 조회 에러:', error)
      throw new Error('댓글 목록을 불러올 수 없습니다.')
   }

   return data as Comment[]
}

// 댓글 목록 조회 (파라미터 기반)
export async function getCommentsByParams(
   params: CommentQueryParams,
): Promise<Comment[]> {
   const { post_id, author_id, limit = 20, offset = 0 } = params
   const supabase = await SupabaseServerClient()

   let query = supabase.from('comments').select('*').eq('post_id', post_id)

   if (author_id) {
      query = query.eq('author_id', author_id)
   }

   const { data, error } = await query
      .order('created_at', { ascending: true })
      .range(offset, offset + limit - 1)

   if (error) {
      console.error('댓글 조회 에러:', error)
      throw new Error('댓글 목록을 불러올 수 없습니다.')
   }

   return data as Comment[]
}

// 댓글 생성
export async function createComment(data: CommentCreate): Promise<Comment> {
   const supabase = await SupabaseServerClient()

   const { data: comment, error } = await supabase
      .from('comments')
      .insert(data)
      .select('*')
      .single()

   if (error) {
      console.error('댓글 생성 에러:', error)
      throw new Error('댓글 생성에 실패했습니다.')
   }

   return comment as Comment
}

// 댓글 업데이트
export async function updateComment(
   id: string | number,
   data: CommentUpdate,
): Promise<Comment> {
   const supabase = await SupabaseServerClient()

   const { data: comment, error } = await supabase
      .from('comments')
      .update(data)
      .eq('id', id)
      .select('*')
      .single()

   if (error) {
      console.error('댓글 업데이트 에러:', error)
      throw new Error('댓글 업데이트에 실패했습니다.')
   }

   return comment as Comment
}

// 댓글 삭제
export async function deleteComment(id: string | number): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { error } = await supabase.from('comments').delete().eq('id', id)

   if (error) {
      console.error('댓글 삭제 에러:', error)
      throw new Error('댓글 삭제에 실패했습니다.')
   }
}

// 특정 댓글 조회
export async function getCommentById(
   id: string | number,
): Promise<Comment | null> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', id)
      .single()

   if (error) {
      console.error('댓글 조회 에러:', error)
      return null
   }

   return data as Comment
}

// 사용자별 댓글 목록 조회
export async function getUserComments(
   userId: string,
   limit = 20,
   offset = 0,
): Promise<Comment[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('author_id', userId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) {
      console.error('사용자 댓글 조회 에러:', error)
      throw new Error('사용자 댓글 목록을 불러올 수 없습니다.')
   }

   return data as Comment[]
}

// 댓글 수 조회
export async function getCommentCount(
   postId: number | string,
): Promise<number> {
   const supabase = await SupabaseServerClient()

   const { count } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', postId)

   return count || 0
}
