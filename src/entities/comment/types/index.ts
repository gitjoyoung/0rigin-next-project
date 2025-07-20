import type { Tables } from '@/shared/types'

// 기본 댓글 타입 (DB 스키마 기반)
export type Comment = Tables<'comments'>

// 댓글 생성 요청 타입
export interface CommentCreate {
   post_id: number
   parent_id?: number | null
   content: string
   author_id?: string | null
   nickname: string
   password?: string | null
   is_guest?: boolean
   depth?: number
}

// 댓글 업데이트 요청 타입
export interface CommentUpdate {
   content: string
   is_edited?: boolean
}

// 댓글 조회 파라미터 타입
export interface CommentQueryParams {
   post_id: number
   author_id?: string
   limit?: number
   offset?: number
}

// 댓글 통계 타입
export interface CommentStats {
   total_comments: number
   comments_this_month: number
   avg_comments_per_post: number
}

// 사용자 댓글 조회용 타입 (게시글 정보 포함)
export interface UserComment {
   id: number
   content: string
   created_at: string
   post_id: number
   post_title: string
   post_category: string | null
}
