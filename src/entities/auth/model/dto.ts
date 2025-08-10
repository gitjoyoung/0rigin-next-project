import { z } from "zod";
import {
  AuthResponseSchema,
  LoginRequestSchema,
  LoginResponseSchema,
  OAuthRequestSchema,
  ResetPasswordRequestSchema,
  SessionResponseSchema,
  SignUpRequestSchema,
  SignUpResponseSchema,
  SignupStatusResponseSchema,
  UpdateEmailRequestSchema,
  UpdatePasswordRequestSchema,
  UserResponseSchema,
} from "./schemas";

// 요청 DTO 타입들
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type SignUpRequest = z.infer<typeof SignUpRequestSchema>;
export type ResetPasswordRequest = z.infer<typeof ResetPasswordRequestSchema>;
export type UpdatePasswordRequest = z.infer<typeof UpdatePasswordRequestSchema>;
export type UpdateEmailRequest = z.infer<typeof UpdateEmailRequestSchema>;
export type OAuthRequest = z.infer<typeof OAuthRequestSchema>;

// 응답 DTO 타입들
export type AuthResponse = z.infer<typeof AuthResponseSchema>;
export type SignUpResponse = z.infer<typeof SignUpResponseSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type SessionResponse = z.infer<typeof SessionResponseSchema>;
export type SignupStatusResponse = z.infer<typeof SignupStatusResponseSchema>;

// 기타 타입들
export type Gender = "man" | "women" | "etc";
export type OAuthProvider = "google" | "github" | "facebook";
export type SignupStatus = "unauth" | "authed" | "needsProfile";
