import { z } from 'zod'
import { emailSchema, passwordSchema } from './common'

// 로그인 스키마 정의
export const LoginParamsSchema = z.object({
   email: emailSchema,
   password: passwordSchema,
})

export type LoginParams = z.infer<typeof LoginParamsSchema>
