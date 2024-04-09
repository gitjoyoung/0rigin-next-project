import { z } from 'zod'

export const commentSchema = z.object({
   nickname: z
      .string()
      .min(4, '아이디 4자 이상이어야 합니다.')
      .max(11, '아이디는 12자 미만이어야 합니다.')
      .regex(/^[a-z0-9]+$/, '영어 소문자와 숫자만 허용됩니다.'),
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(8, '비밀번호는 8자 이하이어야 합니다.')
      .regex(
         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/,
         '비밀번호는 영어 대소문자, 숫자, 특수문자를 포함해야 합니다.',
      ),
   comment: z.string().min(2, '댓글을 입력해주세요.'),
})
