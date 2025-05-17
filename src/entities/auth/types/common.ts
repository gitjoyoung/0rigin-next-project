import { z } from 'zod'

// 인증 관련 응답 타입 정의
export const AuthResponseSchema = z.object({
   success: z.boolean(),
   message: z.string(),
})

export type AuthResponse = z.infer<typeof AuthResponseSchema>

// 이메일 스키마
export const emailSchema = z.string().email('이메일 형식이 아닙니다.')

// 비밀번호 스키마
export const passwordSchema = z
   .string()
   .min(8, '비밀번호는 8자 이상이어야 합니다')
   .max(20, '비밀번호는 20자 이하여야 합니다')
   .regex(
      /^(?=.*[a-z]|.*[A-Z])(?=.*\d|.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/,
      '비밀번호는 영문 대/소문자, 숫자, 특수문자 중 2가지 이상을 조합해야 합니다',
   )

// 비밀번호 확인 스키마
export const confirmPasswordSchema = z
   .string()
   .min(1, '비밀번호 확인을 입력해주세요')

// 성별 스키마
export const genderSchema = z
   .string()
   .regex(/^(man|woman|etc)$/, '성별을 선택해주세요')

// 닉네임 스키마
export const nicknameSchema = z
   .string()
   .min(1, '닉네임을 입력해주세요.')
   .max(10, '닉네임은 10자 이하여야 합니다.')
