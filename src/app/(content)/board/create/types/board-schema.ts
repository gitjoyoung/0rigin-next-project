import { z } from 'zod'

export const boardSchema = z.object({
   nickname: z
      .string()
      .min(2, '아이디 2자 이상이어야 합니다.')
      .max(12, '아이디는 12자 미만이어야 합니다.')
      .regex(/^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/, '문자와 숫자만 허용됩니다.'),
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(8, '비밀번호는 8자 이하이어야 합니다.')
      .regex(
         /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
         '비밀번호는 문자, 숫자만 가능합니다',
      ),
   title: z.string().min(2, '제목을 입력해주세요.'),
   content: z.string().min(2, '내용을 입력해주세요.'),
   thumbnail: z.string().optional(),
   summary: z
      .string()
      .max(160, '요약은 최대 160자 이하로 작성해주세요.')
      .optional(),
})

// Zod 스키마에서 타입스크립트 타입 추출
export type BoardFormType = z.infer<typeof boardSchema>
