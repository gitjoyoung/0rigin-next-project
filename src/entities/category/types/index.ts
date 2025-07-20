import type { Tables } from '@/shared/types'

// 카테고리 기본 타입 (DB 스키마 기반)
export type Category = Tables<'categories'> & {
   post_count?: number // 해당 카테고리의 게시글 수
}

// 카테고리 생성 요청 타입
export interface CategoryCreate {
   name: string
   slug: string
   description?: string
   icon?: string
   order_index?: number
   is_active?: boolean
   can_write?: boolean
}

// 카테고리 업데이트 요청 타입
export interface CategoryUpdate {
   name?: string
   slug?: string
   description?: string
   icon?: string
   order_index?: number
   is_active?: boolean
   can_write?: boolean
}

// 카테고리 조회 파라미터 타입
export interface CategoryQueryParams {
   is_active?: boolean // 활성 카테고리만 조회
   can_write?: boolean // 글쓰기 가능한 카테고리만 조회
   include_post_count?: boolean // 게시글 수 포함 여부
   order_by?: 'order_index' | 'name' | 'created_at' // 정렬 기준
   order?: 'asc' | 'desc' // 정렬 방향
}

// 카테고리 목록 응답 타입
export interface CategoryListResponse {
   items: Category[]
   total: number
}

// 카테고리 통계 타입
export interface CategoryStats {
   total_categories: number
   active_categories: number
   writable_categories: number
   total_posts_by_category: Record<string, number> // 카테고리별 게시글 수
}
