// Auth 전용 에러 타입 및 도우미 함수들

export class AuthError extends Error {
  constructor(
    message: string,
    public code?: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class ValidationError extends AuthError {
  constructor(
    message: string,
    public field?: string,
  ) {
    super(message, "VALIDATION_ERROR", 400);
    this.name = "ValidationError";
  }
}

export class UnauthorizedError extends AuthError {
  constructor(message: string = "로그인이 필요합니다.") {
    super(message, "UNAUTHORIZED", 401);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AuthError {
  constructor(message: string = "접근 권한이 없습니다.") {
    super(message, "FORBIDDEN", 403);
    this.name = "ForbiddenError";
  }
}

export class UserNotFoundError extends AuthError {
  constructor(message: string = "사용자를 찾을 수 없습니다.") {
    super(message, "USER_NOT_FOUND", 404);
    this.name = "UserNotFoundError";
  }
}

export class EmailAlreadyExistsError extends AuthError {
  constructor(message: string = "이미 가입된 이메일입니다.") {
    super(message, "EMAIL_ALREADY_EXISTS", 409);
    this.name = "EmailAlreadyExistsError";
  }
}

export class InvalidCredentialsError extends AuthError {
  constructor(message: string = "이메일 또는 비밀번호가 올바르지 않습니다.") {
    super(message, "INVALID_CREDENTIALS", 401);
    this.name = "InvalidCredentialsError";
  }
}

export class TokenExpiredError extends AuthError {
  constructor(message: string = "토큰이 만료되었습니다.") {
    super(message, "TOKEN_EXPIRED", 401);
    this.name = "TokenExpiredError";
  }
}

export class InvalidTokenError extends AuthError {
  constructor(message: string = "유효하지 않은 토큰입니다.") {
    super(message, "INVALID_TOKEN", 401);
    this.name = "InvalidTokenError";
  }
}

// 에러 도우미 함수들
export function isAuthError(error: unknown): error is AuthError {
  return error instanceof AuthError;
}

export function getErrorMessage(error: unknown): string {
  if (isAuthError(error)) {
    return error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "알 수 없는 오류가 발생했습니다.";
}

export function getErrorCode(error: unknown): string | undefined {
  if (isAuthError(error)) {
    return error.code;
  }

  return undefined;
}

export function getStatusCode(error: unknown): number {
  if (isAuthError(error)) {
    return error.statusCode || 500;
  }

  return 500;
}

// Try-catch 래퍼 함수
export async function handleAuthError<T>(
  fn: () => Promise<T>,
  fallbackMessage: string = "인증 처리 중 오류가 발생했습니다.",
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (isAuthError(error)) {
      throw error;
    }

    throw new AuthError(fallbackMessage);
  }
}
