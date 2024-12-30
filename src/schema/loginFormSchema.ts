import { z } from 'zod'

export const loginFormSchema = z.object({
   email: z.string().email('이메일 형식이 아닙니다.'),
   password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
})
