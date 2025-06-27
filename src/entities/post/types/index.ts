import type { Comment } from '@/entities/comment'
import type { User } from '@supabase/supabase-js'

// 게시글 기본 타입 (DB 스키마 기반 - 모든 필드 명시)
export interface Post {
   id: number // bigserial (bigint)
   created_at: string // timestamp with time zone
   updated_at: string // timestamp with time zone
   title: string // text
   slug: string // text (unique, nullable)
   excerpt: string // text (nullable)
   summary: string // text (nullable)
   content: any // jsonb (예: { markdown: string, html?: string })
   thumbnail: string // text (nullable)
   author_id: string // uuid (nullable, 외래키 없음)
   nickname: string // text (탈퇴해도 이름 보존)
   password: string // text (nullable)
   view_count: number // integer (default 0)
   reading_time: number // integer (nullable)
   tags: string[] // text[] (nullable)
   is_pinned: boolean // boolean (default false)
   category_id: string | null // uuid (외래키, nullable)
   status: 'published' | 'draft' | 'private' // text (default 'published')
   category: string // text (nullable)
}

// 게시글 생성 요청 타입
export interface PostCreate {
   title: string
   content: any
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
   status?: 'published' | 'draft' | 'private'
}

// 게시글 업데이트 요청 타입
export interface PostUpdate {
   title?: string
   content?: any
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
   total: number
   page: number
   limit: number
   totalPages: number
}

// 게시글 상세 정보 타입 (댓글 포함)
export interface PostDetail extends Post {
   comments: Comment[]
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
   content: any
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

// 게시글 카테고리 타입 (DB 스키마 기반 - 모든 필드 명시)
export interface PostCategory {
   id: string // uuid
   name: string // text
   slug: string // text
   description: string // text
   icon: string // text
   order_index: number // integer
   is_active: boolean // boolean
   created_at: string // timestamp with time zone
   updated_at: string // timestamp with time zone
   post_count: number // 게시글 수 (집계용)
}

// 게시글 좋아요 타입
export interface PostLike {
   id: string
   post_id: number // BIGINT (posts.id 참조)
   user_id: string
   created_at: string
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
