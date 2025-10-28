// src/constants/protected-routes.ts
// ─────────────────────────────────────────────────────────────
// 미들웨어용 초경량 매칭 구조:
// - PROTECTED_PREFIXES: 인증이 필요한 "접두" 목록 (빠른 startsWith)
// - AUTH_FORBIDDEN_PATHS: 로그인 상태에서 접근 금지되는 "정확 일치" 경로(Set)
// ─────────────────────────────────────────────────────────────

/** 인증이 필요한 접두(prefix)들. 세부는 페이지 단에서 추가 검증 */
export const PROTECTED_PREFIXES: string[] = [
  "/dashboard",
  "/account",
  "/settings",
  "/admin",
  // 필요 시 추가…
];

/** 로그인 상태에서 접근 금지(정확 일치)되는 경로들 */
export const AUTH_FORBIDDEN_PATHS: Set<string> = new Set([
  "/login",
  "/sign",
  "/sign/form",
  "/sign/welcome",
  "/reset/password",
  "/forget/password",
]);

/** (선택) 공개 접두. 미들웨어에서는 사용하지 않아도 무방 */
export const PUBLIC_PREFIXES: string[] = [
  "/",
  "/board",
  "/question",
  "/utils",
  // 필요 시 추가…
];
