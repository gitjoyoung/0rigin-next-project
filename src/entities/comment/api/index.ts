import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import type {
   Comment,
   CommentCreate,
   CommentQueryParams,
   CommentUpdate,
   UserComment,
} from '../types'

// password 필드 제거 유틸
function removePasswordFromComment(comment: any) {
   if (!comment) return comment
   const { password, ...rest } = comment
   return rest
}

// 댓글 목록 조회
export async function getComments(postId: number | string): Promise<Comment[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', Number(postId))
      .order('created_at', { ascending: true })

   if (error) {
      console.error('댓글 조회 에러:', error)
      throw new Error('댓글 목록을 불러올 수 없습니다.')
   }

   return (data as Comment[]).map(removePasswordFromComment)
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

   return (data as Comment[]).map(removePasswordFromComment)
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

   return removePasswordFromComment(comment as Comment)
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
      .eq('id', Number(id))
      .select('*')
      .single()

   if (error) {
      console.error('댓글 업데이트 에러:', error)
      throw new Error('댓글 업데이트에 실패했습니다.')
   }

   return removePasswordFromComment(comment as Comment)
}

// 댓글 삭제
export async function deleteComment(id: string | number): Promise<void> {
   const supabase = await SupabaseServerClient()

   const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', Number(id))

   if (error) {
      console.error('댓글 삭제 에러:', error)
      throw new Error('댓글 삭제에 실패했습니다.')
   }
}

// 특정 댓글 조회
export async function getCommentById(
   id: string | number,
   includePassword = false,
): Promise<Comment | null> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', Number(id))
      .single()

   if (error) {
      console.error('댓글 조회 에러:', error)
      return null
   }

   // 권한 검증을 위해 password가 필요한 경우 password 포함하여 반환
   if (includePassword) {
      return data as Comment
   }

   return removePasswordFromComment(data as Comment)
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

   return (data as Comment[]).map(removePasswordFromComment)
}

// 댓글 수 조회
export async function getCommentCount(
   postId: number | string,
): Promise<number> {
   const supabase = await SupabaseServerClient()

   const { count } = await supabase
      .from('comments')
      .select('*', { count: 'exact', head: true })
      .eq('post_id', Number(postId))

   return count || 0
}

// 사용자 댓글 조회 (게시글 정보 포함)
export async function getCommentsByUserId(
   userId: string,
): Promise<UserComment[]> {
   const supabase = await SupabaseServerClient()

   const { data: comments, error } = await supabase
      .from('comments')
      .select(
         `
         id,
         content,
         created_at,
         post_id,
         posts!inner(
            title,
            category_id
         )
      `,
      )
      .eq('author_id', userId)
      .order('created_at', { ascending: false })

   if (error) {
      console.error('댓글 조회 오류:', error)
      throw new Error('댓글을 불러올 수 없습니다.')
   }

   // UserComment 타입에는 password가 포함되지 않으므로 별도 처리 불필요
   return comments.map((comment) => ({
      id: comment.id,
      content: comment.content,
      created_at: comment.created_at,
      post_id: comment.post_id,
      post_title: (comment.posts as any)?.title || '제목 없음',
      post_category: (comment.posts as any)?.category_id || null,
   })) as UserComment[]
}
