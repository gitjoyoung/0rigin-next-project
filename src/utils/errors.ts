export class AuthError extends Error {
   constructor(message: string) {
      super(message)
      this.name = 'AuthError'
   }
}

export const AUTH_ERRORS = {
   INVALID_CREDENTIALS: '이메일 또는 비밀번호가 올바르지 않습니다.',
   EMAIL_EXISTS: '이미 등록된 이메일입니다.',
   REQUIRED_FIELDS: '모든 필수 항목을 입력해주세요.',
   // ... 기타 에러 메시지
} as const
