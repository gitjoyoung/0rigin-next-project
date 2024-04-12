import { z } from 'zod'

export const boardSchema = z.object({
   nickname: z
      .string()
      .min(2, '아이디 2자 이상이어야 합니다.')
      .max(12, '아이디는 12자 미만이어야 합니다.')
      .regex(/^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/, '문자와 숫자만 허용됩니다.'),
   title: z.string().min(2, '제목을 입력해주세요.'),
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(8, '비밀번호는 8자 이하이어야 합니다.')
      .regex(
         /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
         '비밀번호는 문자, 숫자만 가능합니다',
      ),
})
