import { z } from 'zod'

export const commentSchema = z.object({
   post_id: z.number(),
   parent_id: z.number(),
   content: z.string().min(1, '댓글 내용을 입력해주세요.'),
   author_id: z.string(),
   guest_name: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(10, '비밀번호는 10자 이하이어야 합니다.')
      .regex(
         /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
         '비밀번호는 문자, 숫자만 가능합니다',
      ),
   is_approved: z.boolean(),
   is_edited: z.boolean(),
   depth: z.number(),
})
