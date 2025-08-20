import { z } from "zod";

// 기본 스키마들
export const emailSchema = z.string().email("이메일 형식이 아닙니다.");

export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 8자 이상이어야 합니다")
  .max(20, "비밀번호는 20자 이하여야 합니다")
  .regex(
    /^(?=.*[a-z]|.*[A-Z])(?=.*\d|.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]+$/,
    "비밀번호는 영문 대/소문자, 숫자, 특수문자 중 2가지 이상을 조합해야 합니다",
  );

export const confirmPasswordSchema = z
  .string()
  .min(1, "비밀번호 확인을 입력해주세요");

export const genderSchema = z
  .string()
  .min(1, "성별을 선택해주세요")
  .regex(/^(man|women|etc)$/, "성별을 선택해주세요");

export const nicknameSchema = z
  .string()
  .min(1, "닉네임을 입력해주세요.")
  .max(10, "닉네임은 10자 이하여야 합니다.");

// 요청 스키마들
export const LoginRequestSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const SignUpRequestSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
    nickname: nicknameSchema,
    gender: genderSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "입력하신 비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

export const ResetPasswordRequestSchema = z.object({
  password: passwordSchema,
  confirmPassword: confirmPasswordSchema,
});

export const UpdatePasswordRequestSchema = z.object({
  password: passwordSchema,
});

export const ResetPasswordResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const UpdateEmailRequestSchema = z.object({
  email: emailSchema,
});

export const OAuthRequestSchema = z.object({
  provider: z.enum(["google", "github", "facebook"]),
  redirectTo: z.string().url().optional(),
});

// 응답 스키마들
export const AuthResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});

export const SignUpResponseSchema = z.object({
  userId: z.string().nullable(),
  email: z.string().nullable(),
});

export const LoginResponseSchema = z.object({
  userId: z.string(),
  email: z.string(),
});

export const UserResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  nickname: z.string().optional(),
  gender: z.string().optional(),
  email_confirmed_at: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const SessionResponseSchema = z.object({
  created_at: z.string(),
  expires_at: z.string(),
  refresh_token: z.string().nullable(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    last_sign_in_at: z.string().nullable(),
  }),
});

export const SignupStatusResponseSchema = z.object({
  status: z.enum(["unauth", "authed", "needsProfile"]),
  user: z.any().nullable(),
  profile: z.any().optional(),
});
