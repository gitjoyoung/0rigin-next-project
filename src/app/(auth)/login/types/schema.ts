import { z } from 'zod'

export type LoginForm = z.infer<typeof LoginSchema>

export const LoginSchema = z.object({
   email: z.string().email('올바른 이메일을 입력해주세요'),
   password: z.string().min(1, '비밀번호를 입력해주세요'),
})
