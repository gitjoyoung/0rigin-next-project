import { z } from 'zod'

export const loginFormSchema = z.object({
   email: z.string().min(4, '아이디 4자 이상이어야 합니다.'),
   password: z.string().min(8, '비밀번호는 8자 이상이어야 합니다.'),
})
