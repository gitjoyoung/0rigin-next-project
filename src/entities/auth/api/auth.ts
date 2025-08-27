"use server";

import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import type { AuthResponse } from "@supabase/supabase-js";
// 에러 클래스 제거하고 간단한 Error 사용
import type { LoginRequest, SignUpRequest } from "../model/dto";

// 회원가입
export async function signUp({
  email,
  password,
  nickname,
  gender,
}: SignUpRequest): Promise<AuthResponse["data"]> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { display_name: nickname, nickname, gender },
    },
  });

  if (error) {
    // Supabase 공식 에러 코드에 따른 사용자 친화적 메시지 제공
    switch (error.code) {
      case "user_already_exists":
      case "email_address_already_exists":
        throw new Error("이미 가입된 이메일입니다.");
      case "weak_password":
        throw new Error("비밀번호 형식에 맞지않습니다.");
      case "invalid_email":
        throw new Error("올바르지 않은 이메일 형식입니다.");
      case "signup_disabled":
        throw new Error("회원가입이 일시 중단되었습니다.");
      case "email_rate_limit_exceeded":
        throw new Error("이메일 전송 한도 초과. ");
      case "over_email_send_rate_limit":
        throw new Error("이메일 요청 오류. ");
      case "database_error":
        throw new Error("데이터베이스 오류.");
      case "unexpected_failure":
        throw new Error("이미 사용 중인 닉네임입니다.");
      default:
        throw new Error(error.message || "회원가입에 실패했습니다.");
    }
  }

  return data;
}

/**
 * 로그인
 * @param email
 * @param password
 * @returns

 */
export async function signIn({
  email,
  password,
}: LoginRequest): Promise<AuthResponse> {
  const supabase = await SupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Supabase 공식 에러 코드에 따른 사용자 친화적 메시지 제공
    switch (error.code) {
      case "invalid_credentials":
      case "invalid_login_credentials":
        throw new Error("이메일 또는 비밀번호가 올바르지 않습니다.");
      case "email_not_confirmed":
        throw new Error("이메일 인증이 필요합니다. 이메일을 확인해주세요.");
      case "too_many_requests":
      case "rate_limit":
        throw new Error("로그인 시도가 너무 많습니다. 잠시 후 재시도해주세요.");
      case "signin_disabled":
      case "user_not_found":
        throw new Error("계정을 찾을 수 없습니다.");
      case "password_auth_disabled":
        throw new Error("패스워드 로그인이 비활성화되었습니다.");
      case "invalid_email":
        throw new Error("올바르지 않은 이메일 형식입니다.");
      case "user_disabled":
        throw new Error("계정이 비활성화되었습니다. 관리자에게 문의하세요.");
      default:
        throw new Error(error.message || "로그인 중 오류가 발생했습니다.");
    }
  }

  return { data, error };
}
