// 댓글 타입 (DB 스키마 기반 - 모든 필드 명시)
export interface Comment {
   id: number // BIGSERIAL
   post_id: number // BIGINT (posts.id 참조)
   parent_id: number | null // BIGINT (comments.id 참조, 대댓글인 경우)
   created_at: string // TIMESTAMP WITH TIME ZONE
   updated_at: string // TIMESTAMP WITH TIME ZONE
   content: string // TEXT
   author_id: string | null // UUID (auth.users.id 참조, 회원인 경우)
   nickname: string // TEXT (작성자 닉네임)
   password: string | null // TEXT (비회원 댓글 수정/삭제용)
   is_guest: boolean // BOOLEAN (비회원 여부)
   likes: number // INTEGER (댓글 좋아요 수)
   is_approved: boolean // BOOLEAN (댓글 승인 상태)
   is_edited: boolean // BOOLEAN (수정 여부)
   depth: number // INTEGER (댓글 깊이)
   author?: {
      id: string
      username: string
      avatar_url: string
   }
}

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
