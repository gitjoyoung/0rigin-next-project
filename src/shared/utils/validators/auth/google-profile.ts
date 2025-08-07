import { z } from "zod";

// 구글 프로필 완성을 위한 스키마
export const GoogleProfileSchema = z.object({
  nickname: z.string().min(2, { message: "닉네임은 2글자 이상이어야 합니다." }),
  gender: z.enum(["man", "women", "etc"], {
    required_error: "성별을 선택해주세요.",
  }),
});

export type GoogleProfileParams = z.infer<typeof GoogleProfileSchema>;
