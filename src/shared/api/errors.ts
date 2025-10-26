/**
 * 공통 에러 클래스 및 Supabase 에러 정규화
 */

export class AppError extends Error {
  constructor(
    message: string,
    public code: string,
    public status?: number,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

/**
 * Supabase PostgrestError를 표준 AppError로 변환
 */
export function normalizeSupabaseError(error: any): AppError {
  const code = error.code ?? "UNKNOWN_ERROR";
  const message = error.message ?? "데이터베이스 오류가 발생했습니다.";

  // Supabase/PostgreSQL 에러 코드 매핑
  const statusMap: Record<string, number> = {
    PGRST116: 404, // Not found
    "23505": 409, // Unique violation (중복)
    "23503": 400, // Foreign key violation
    "23502": 400, // Not null violation
    "42P01": 500, // Undefined table
    "42703": 500, // Undefined column
  };

  // 사용자 친화적 메시지 매핑
  const messageMap: Record<string, string> = {
    "23505": "이미 존재하는 데이터입니다.",
    "23503": "연관된 데이터가 없습니다.",
    "23502": "필수 항목이 누락되었습니다.",
    PGRST116: "요청한 데이터를 찾을 수 없습니다.",
  };

  return new AppError(
    messageMap[code] ?? message,
    code,
    statusMap[code] ?? 500,
    error.details,
  );
}

/**
 * 에러 로깅 유틸 (선택적)
 */
export function logError(error: unknown, context?: string) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[${context ?? "Error"}]`, error);
  }
  // TODO: 프로덕션에서는 Sentry, DataDog 등으로 전송
}
