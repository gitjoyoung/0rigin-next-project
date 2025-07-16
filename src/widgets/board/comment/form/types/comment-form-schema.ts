import z from 'zod'

export const formCommentSchema = z.object({
   content: z.string().min(1, '댓글 내용을 입력해주세요.'),
   nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(10, '비밀번호는 10자 이하이어야 합니다.')
      .regex(
         /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
         '비밀번호는 문자, 숫자만 가능합니다',
      ),
})

export type CommentFormData = z.infer<typeof formCommentSchema>
