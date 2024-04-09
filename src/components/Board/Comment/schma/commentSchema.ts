import { z } from 'zod'

export const commentSchema = z.object({
   nickname: z
      .string()
      .min(2, '아이디 2자 이상이어야 합니다.')
      .max(12, '아이디는 12자 미만이어야 합니다.')
      .regex(/^[A-Za-z\d가-힣]+$/, '영어 소문자와 숫자만 허용됩니다.'),
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(8, '비밀번호는 8자 이하이어야 합니다.')
      .regex(/^[A-Za-z\d가-힣]+$/, '비밀번호는 문자, 숫자만 가능합니다'),

   comment: z.string().min(2, '댓글을 입력해주세요.'),
})
