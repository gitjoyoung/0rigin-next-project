"use server";

import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import type { UserResponse } from "@supabase/supabase-js";

// 비밀번호 재설정 요청 (이메일 발송)
export async function resetPassword(email: string): Promise<void> {
  const supabase = await SupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
  });
  if (error) throw new Error(error.message);
}

// 비밀번호 업데이트
export async function updatePassword(
  password: string,
): Promise<UserResponse["data"]> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) throw new Error(error.message);

  return data; // { user }
}

// 비밀번호 재설정 코드 검증 + 비밀번호 변경
export async function verifyPasswordReset(
  code: string,
  newPassword: string,
): Promise<UserResponse["data"]> {
  const supabase = await SupabaseServerClient();

  // 인증 코드 → 세션 교환 (타입 주석 필요 없음)
  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) throw new Error(exchangeError.message);

  // 비밀번호 업데이트
  return updatePassword(newPassword);
}
