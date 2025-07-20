import type { Tables } from '@/shared/types'
import type { User } from '@supabase/supabase-js'

export type PostBase = Tables<'posts'>

export interface Post extends PostBase {
   thumbnail: string
   likes_count?: number
   comments_count?: number
}

// 게시글 생성 요청 타입
export interface PostCreate {
   title: string
   content: { markdown: string; html?: string } | string
   slug?: string
   excerpt?: string
   summary?: string
   thumbnail?: string
   author_id?: string
   nickname?: string
   password?: string
   reading_time?: number
   tags?: string[]
   is_pinned?: boolean
   category_id?: string
   category?: string
   status?: 'published' | 'draft' | 'private'
}

// 게시글 업데이트 요청 타입
export interface PostUpdate {
   title?: string
   content?: { markdown: string; html?: string } | string
   slug?: string
   excerpt?: string
   summary?: string
   thumbnail?: string
   nickname?: string
   password?: string
   reading_time?: number
   tags?: string[]
   is_pinned?: boolean
   category_id?: string
   status?: 'published' | 'draft' | 'private'
   view_count?: number
}

// 게시글 조회 파라미터 타입
export interface PostQueryParams {
   category?: string // 카테고리 slug
   categoryId?: string // 카테고리 ID (직접 사용시)
   page?: number
   limit?: number
   search?: string
   author_id?: string
}

// 게시글 목록 응답 타입
export interface PostListResponse {
   items: Post[]
   totalCount: number
   currentPage: number
   totalPages: number
}

// 게시글 상세 정보 타입
export interface PostDetail extends Post {
   author?: {
      id: string
      username: string
      avatar_url: string
   }
}

// 게시글 검색 결과 타입
export interface PostSearchResult {
   id: number
   title: string
   content: { markdown: string; html?: string } | string
   category_id: string
   author_id: string
   created_at: string
   author: {
      id: string
      username: string
      avatar_url: string
   }
   excerpt: string
}

// 게시글 통계 타입
export interface PostStats {
   total_posts: number
   total_likes: number
   total_views: number
   total_comments: number
}

// 게시글 조회수 타입 (DB 스키마 기반 - 모든 필드 명시)
export interface PostView {
   id: string
   post_id: number // BIGINT (posts.id 참조)
   user_id: string
   ip_address: string
   created_at: string
}

// 게시글 + 작성자 정보
export interface PostWithAuthor extends Post {
   author: User
}
