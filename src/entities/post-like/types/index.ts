import type { Tables } from '@/shared/types'

// 게시글 좋아요 기본 타입 (DB 스키마 기반)
export type PostLike = Tables<'post_likes'>

// 좋아요 생성 요청 타입
export interface PostLikeCreate {
   post_id: number
   anon_key: string // 비회원
   authenticated: boolean
}

// 좋아요 토글 요청 타입
export interface PostLikeToggleRequest {
   post_id: number
   user_id?: string // 로그인 회원
   anon_key?: string // 비회원
}

// 좋아요 상태 체크 요청 타입
export interface PostLikeCheckRequest {
   post_id: number
   user_id?: string
   anon_key?: string
}

// 좋아요 상태 응답 타입
export interface PostLikeStatusResponse {
   isLiked: boolean
   likeId?: string
   createdAt?: string
}

// 좋아요 카운트 응답 타입
export interface PostLikeCountResponse {
   count: number
}

// 좋아요 사용자 목록 응답 타입
export interface PostLikeUsersResponse {
   users: {
      user_id?: string
      anon_key?: string
      created_at: string
   }[]
}

// 게시글별 좋아요 통계 타입
export interface PostLikeStats {
   post_id: number
   total_likes: number
   user_likes: number // 로그인 회원 좋아요 수
   anon_likes: number // 비회원 좋아요 수
   recent_likes: PostLike[] // 최근 좋아요 목록
}

// 사용자별 좋아요 통계 타입
export interface UserLikeStats {
   user_id: string
   total_liked_posts: number
   recent_liked_posts: number[]
   most_liked_categories: string[]
}
