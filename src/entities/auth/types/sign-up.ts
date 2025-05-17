import { z } from 'zod'
import {
   confirmPasswordSchema,
   emailSchema,
   genderSchema,
   nicknameSchema,
   passwordSchema,
} from './common'

// 회원가입 스키마 정의
export const SignUpParamsSchema = z
   .object({
      email: emailSchema,
      password: passwordSchema,
      confirmPassword: confirmPasswordSchema,
      nickname: nicknameSchema,
      gender: genderSchema,
   })
   .refine((data) => data.password === data.confirmPassword, {
      message: '입력하신 비밀번호가 일치하지 않습니다.',
      path: ['confirmPassword'],
   })

export type SignUpParams = z.infer<typeof SignUpParamsSchema>
