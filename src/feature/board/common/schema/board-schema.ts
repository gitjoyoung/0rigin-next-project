import {
  NICKNAME_RULES,
  POST_PASSWORD_RULES,
  POST_RULES,
} from "@/shared/constants/validation-rules";
import { z } from "zod";

// 기본 스키마 (비로그인 사용자용)
export const boardSchema = z.object({
  nickname: z
    .string()
    .min(NICKNAME_RULES.MIN_LENGTH, NICKNAME_RULES.ERROR_MESSAGES.MIN_LENGTH)
    .max(NICKNAME_RULES.MAX_LENGTH, NICKNAME_RULES.ERROR_MESSAGES.MAX_LENGTH)
    .regex(NICKNAME_RULES.PATTERN, NICKNAME_RULES.ERROR_MESSAGES.PATTERN),
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
  title: z
    .string()
    .min(POST_RULES.TITLE_MIN_LENGTH, POST_RULES.ERROR_MESSAGES.TITLE),
  content: z
    .string()
    .min(POST_RULES.CONTENT_MIN_LENGTH, POST_RULES.ERROR_MESSAGES.CONTENT),
  thumbnail: z.string().optional(),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  summary: z
    .string()
    .max(POST_RULES.SUMMARY_MAX_LENGTH, POST_RULES.ERROR_MESSAGES.SUMMARY)
    .optional(),
});

// 로그인된 사용자용 스키마 (닉네임과 비밀번호 필드 제거)
export const authenticatedBoardSchema = z.object({
  title: z.string().min(2, "제목을 입력해주세요."),
  content: z.string().min(2, "내용을 입력해주세요."),
  thumbnail: z.string().optional(),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  summary: z
    .string()
    .max(160, "요약은 최대 160자 이하로 작성해주세요.")
    .optional(),
});

// Zod 스키마에서 타입스크립트 타입 추출
export type BoardFormType = z.infer<typeof boardSchema>;
export type AuthenticatedBoardFormType = BoardFormType & {
  nickname: string;
  password: string;
};
