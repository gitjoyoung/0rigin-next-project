"use server";

import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import type { AuthResponse, Session } from "@supabase/supabase-js";
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

  if (error) throw new Error(error.message);

  return data;
}

/**
 * 로그인
 * @param email
 * @param password
 * @returns
 * @throws InvalidEmailError: 이메일 형식이 유효하지 않을 때 발생합니다.
 * @throws InvalidPasswordError: 비밀번호가 유효하지 않을 때 발생합니다.
 * @throws UserNotFoundError: 해당 이메일 또는 전화번호로 등록된 사용자가 없을 때 발생합니다.
 * @throws TooManyRequestsError: 너무 많은 요청이 발생했을 때 발생합니다.
 * WeakPasswordError: 비밀번호가 너무 약할 때 발생합니다.
 */
export async function signIn({
  email,
  password,
}: LoginRequest): Promise<AuthResponse> {
  const supabase = await SupabaseServerClient();
  const result = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  return result;
}

// 로그아웃
export async function signOut(): Promise<boolean> {
  const supabase = await SupabaseServerClient();

  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);

  return true;
}

// 현재 세션 조회
// 세션을 조회하는 이유는 토큰 만료 시 새로운 토큰을 발급하는 것
export async function getCurrentSession(): Promise<Session | null> {
  const supabase = await SupabaseServerClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) throw new Error(error.message);

  return session;
}

// 세션을 갱신
export async function refreshSession(): Promise<AuthResponse["data"]> {
  const supabase = await SupabaseServerClient();
  const { data, error } = await supabase.auth.refreshSession();
  if (error) throw new Error(error.message);
  return data;
}
