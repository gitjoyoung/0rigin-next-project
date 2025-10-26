/**
 * Supabase 테이블 이름 상수
 *
 * 중요: 테이블 이름 변경 시 이 파일만 수정하면 됩니다.
 * 모든 entities에서 이 상수를 import하여 사용하세요.
 */

export const TABLE_NAMES = {
  // 게시판
  POSTS: "posts",
  CATEGORIES: "categories",
  COMMENTS: "comments",

  // 사용자
  PROFILE: "profile",

  // 퀴즈
  QUIZZES: "quizzes",
  QUIZ_QUESTIONS: "quiz_questions",

  // 통계
  POST_LIKES: "post_likes",
  STATS: "stats",
} as const;

// 타입 추론을 위한 타입 export
export type TableName = (typeof TABLE_NAMES)[keyof typeof TABLE_NAMES];
