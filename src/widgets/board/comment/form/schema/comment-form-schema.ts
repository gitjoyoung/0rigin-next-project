import z from 'zod'

// 기본 스키마 (공통 필드)
const baseSchema = z.object({
   content: z.string().min(1, '댓글 내용을 입력해주세요.'),
   nickname: z.string().min(2, '닉네임은 2자 이상이어야 합니다.'),
})

// 게스트용 스키마 (비밀번호 필수)
const guestSchema = baseSchema.extend({
   password: z
      .string()
      .min(4, '비밀번호는 4자 이상이어야 합니다.')
      .max(10, '비밀번호는 10자 이하이어야 합니다.')
      .regex(
         /^[A-Za-z\d가-힣ㄱ-ㅎㅏ-ㅣ]+$/,
         '비밀번호는 문자, 숫자만 가능합니다',
      ),
})

// 인증된 사용자용 스키마 (비밀번호 선택적)
const authedSchema = baseSchema.extend({
   password: z.string().optional(),
})

// 조건부 스키마 생성 함수
export const createFormSchema = (isAuthed: boolean) => {
   return isAuthed ? authedSchema : guestSchema
}

// 기본 스키마 (호환성을 위해 유지)
export const formCommentSchema = guestSchema

export type CommentFormData = z.infer<typeof formCommentSchema>
