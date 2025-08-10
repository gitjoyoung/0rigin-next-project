"use server";

import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import type { User } from "@supabase/supabase-js";
import type { AuthResponse, SignupStatusResponse } from "../model/dto";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await SupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user ?? null;
}

// getUser 별칭 (기존 호환성)
export const getUser = getCurrentUser;

export async function checkSignupCompleteServer(): Promise<SignupStatusResponse> {
  const supabase = await SupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { status: "unauth", user: null };
  }

  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (error) {
    return { status: "unauth", user: null };
  }

  if (!profile?.is_active) {
    return { status: "needsProfile", user, profile };
  }

  return { status: "authed", user, profile };
}

export async function updateEmail(email: string): Promise<AuthResponse> {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    const supabase = await SupabaseServerClient();

    const { error } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      return { success: false, message: "이메일 변경 요청에 실패했습니다." };
    }

    return {
      success: true,
      message: "새 이메일 주소로 인증 메일을 발송했습니다.",
    };
  } catch (error) {
    return {
      success: false,
      message: "이메일 변경 중 오류가 발생했습니다.",
    };
  }
}

export async function verifyEmail(
  token: string,
  type: string = "email",
): Promise<AuthResponse> {
  try {
    const supabase = await SupabaseServerClient();

    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type as any,
    });

    if (error) {
      return { success: false, message: "이메일 인증에 실패했습니다." };
    }

    return {
      success: true,
      message: "이메일 인증이 완료되었습니다.",
    };
  } catch (error) {
    return {
      success: false,
      message: "이메일 인증 중 오류가 발생했습니다.",
    };
  }
}

export async function getUserById(userId: string): Promise<User | null> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) throw new Error(error.message);

  return data.user || null;
}

export async function updateUserById(
  userId: string,
  updateData: any,
): Promise<User | null> {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase.auth.admin.updateUserById(
    userId,
    updateData,
  );

  if (error) throw new Error(error.message);

  return data.user || null;
}

export async function deleteUserById(userId: string): Promise<boolean> {
  const supabase = await SupabaseServerClient();

  const { error } = await supabase.auth.admin.deleteUser(userId);

  if (error) throw new Error(error.message);

  return true;
}
