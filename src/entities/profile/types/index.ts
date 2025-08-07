import type { Tables } from "@/shared/types";

// 프로필 기본 타입 (DB 스키마 기반)
export type Profile = Tables<"profile">;

// 프로필 업데이트 요청 타입
export interface UpdateProfileRequest {
  nickname: string;
  gender: string;
  bio?: string;
  avatar_url?: string;
  signup_complete?: boolean;
}

// 프로필 생성 요청 타입
export interface CreateProfileRequest {
  id: string;
  email: string;
  nickname: string;
  gender: string;
  avatar_url?: string;
  bio?: string;
}

// 프로필 검색 결과 타입
export interface ProfileSearchResult {
  id: string;
  nickname: string;
  avatar_url?: string | null;
  bio?: string | null;
  created_at: string;
}

// 프로필 통계 타입
export interface ProfileStats {
  total_posts: number;
  total_likes: number;
  total_comments: number;
  join_date: string;
  last_activity: string;
}

// 프로필 상세 정보 타입 (통계 포함)
export interface ProfileDetail extends Profile {
  stats: ProfileStats;
}

// 프로필 변경 이력 타입
export interface ProfileChangeHistory {
  id: string;
  profile_id: string;
  changed_field: string;
  old_value: string;
  new_value: string;
  changed_at: string;
  changed_by: string;
}
