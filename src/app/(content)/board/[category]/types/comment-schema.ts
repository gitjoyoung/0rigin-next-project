import {
   NICKNAME_RULES,
   POST_PASSWORD_RULES,
} from '@/shared/constants/validation-rules'
import { z } from 'zod'

export const commentSchema = z.object({
   post_id: z.number(),
   parent_id: z.number(),
   content: z.string().min(1, '댓글 내용을 입력해주세요.'),
   author_id: z.string(),
   nickname: z
      .string()
      .min(NICKNAME_RULES.MIN_LENGTH, NICKNAME_RULES.ERROR_MESSAGES.MIN_LENGTH),
   password: z
      .string()
      .min(
         POST_PASSWORD_RULES.MIN_LENGTH,
         POST_PASSWORD_RULES.ERROR_MESSAGES.MIN_LENGTH,
      )
      .max(
         POST_PASSWORD_RULES.MAX_LENGTH,
         POST_PASSWORD_RULES.ERROR_MESSAGES.MAX_LENGTH,
      )
      .regex(
         POST_PASSWORD_RULES.PATTERN,
         POST_PASSWORD_RULES.ERROR_MESSAGES.PATTERN,
      ),
   is_approved: z.boolean(),
   is_edited: z.boolean(),
   depth: z.number(),
})
