/**
 * 클라이언트사이드 쿠키 유틸리티 함수들
 * 브라우저 환경에서 안전하게 쿠키를 조작할 수 있는 헬퍼 함수들
 */

export interface CookieOptions {
  /** 쿠키 만료 시간 (초 단위) */
  maxAge?: number;
  /** 쿠키 만료 날짜 */
  expires?: Date;
  /** 쿠키 경로 */
  path?: string;
  /** 쿠키 도메인 */
  domain?: string;
  /** HTTPS에서만 쿠키 전송 */
  secure?: boolean;
  /** JavaScript로 접근 불가 (서버 전용) */
  httpOnly?: boolean;
  /** CSRF 공격 방지 */
  sameSite?: "strict" | "lax" | "none";
}

/**
 * 쿠키 값을 가져옵니다
 * @param name 쿠키 이름
 * @returns 쿠키 값 (없으면 null)
 */
export function getCookie(name: string): string | null {
  if (typeof window === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || null;
  }

  return null;
}

/**
 * 쿠키를 설정합니다
 * @param name 쿠키 이름
 * @param value 쿠키 값
 * @param options 쿠키 옵션
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
): void {
  if (typeof window === "undefined") return;

  const {
    maxAge = 60 * 60 * 24, // 기본 1일
    path = "/",
    secure = window.location.protocol === "https:",
    sameSite = "lax",
    domain,
    expires,
    httpOnly = false, // 클라이언트에서 접근해야 하므로 false
  } = options;

  let cookieString = `${name}=${encodeURIComponent(value)}`;

  if (maxAge !== undefined) {
    cookieString += `; Max-Age=${maxAge}`;
  }

  if (expires) {
    cookieString += `; Expires=${expires.toUTCString()}`;
  }

  cookieString += `; Path=${path}`;

  if (domain) {
    cookieString += `; Domain=${domain}`;
  }

  if (secure) {
    cookieString += "; Secure";
  }

  if (httpOnly) {
    cookieString += "; HttpOnly";
  }

  cookieString += `; SameSite=${sameSite}`;

  document.cookie = cookieString;
}

/**
 * 쿠키를 삭제합니다
 * @param name 쿠키 이름
 * @param options 쿠키 옵션 (path, domain 등)
 */
export function removeCookie(
  name: string,
  options: Pick<CookieOptions, "path" | "domain"> = {},
): void {
  if (typeof window === "undefined") return;

  setCookie(name, "", {
    ...options,
    maxAge: -1,
  });
}

/**
 * JSON 객체를 쿠키에 저장합니다
 * @param name 쿠키 이름
 * @param value JSON 객체
 * @param options 쿠키 옵션
 */
export function setJsonCookie<T>(
  name: string,
  value: T,
  options?: CookieOptions,
): void {
  setCookie(name, JSON.stringify(value), options);
}

/**
 * 쿠키에서 JSON 객체를 가져옵니다
 * @param name 쿠키 이름
 * @returns 파싱된 JSON 객체 (파싱 실패시 null)
 */
export function getJsonCookie<T>(name: string): T | null {
  const value = getCookie(name);
  if (!value) return null;

  try {
    return JSON.parse(decodeURIComponent(value));
  } catch {
    return null;
  }
}
