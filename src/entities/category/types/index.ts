// 카테고리 기본 타입 (DB 스키마 기반 - 모든 필드 명시)
export interface Category {
   id: string // uuid (primary key)
   name: string // text (카테고리 이름)
   slug: string // text (URL 친화적 식별자, unique)
   description?: string // text (카테고리 설명, nullable)
   icon?: string // text (아이콘 클래스나 이미지 URL, nullable)
   order_index?: number // integer (정렬 순서, nullable)
   is_active: boolean // boolean (활성화 여부, default true)
   can_write: boolean // boolean (글쓰기 허용 여부, default true)
   created_at: string // timestamp with time zone
   updated_at: string // timestamp with time zone
   // 집계 필드 (옵셔널)
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
