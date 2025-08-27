"use client";

import { SupabaseBrowserClient } from "@/shared/lib/supabase/supabase-browser-client";
import type { Session, User } from "@supabase/supabase-js";

/**
 * 클라이언트용 세션 관리 API
 * 브라우저에서만 실행되는 인증 관련 함수들
 */

// 현재 사용자 정보 조회
export async function getCurrentUser(): Promise<User | null> {
  const supabase = SupabaseBrowserClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Get current user error:", error);
    return null;
  }

  return user;
}

// 현재 세션 조회
export async function getCurrentSession(): Promise<Session | null> {
  const supabase = SupabaseBrowserClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Get current session error:", error);
    return null;
  }

  return session;
}

// 프로필 정보 조회
export async function getProfile(userId: string) {
  const supabase = SupabaseBrowserClient();

  try {
    const { data: profile, error } = await supabase
      .from("profile")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Get profile error:", error);
      return null;
    }

    return profile;
  } catch (error) {
    console.error("Profile fetch error:", error);
    return null;
  }
}

// 인증 상태 확인 (user + profile)
export async function checkAuthStatus() {
  const user = await getCurrentUser();

  if (!user) {
    return {
      status: "unauth" as const,
      user: null,
      profile: null,
    };
  }

  const profile = await getProfile(user.id);

  return {
    status: profile ? ("authed" as const) : ("needsProfile" as const),
    user,
    profile,
  };
}

// 로그아웃
export async function signOut(): Promise<void> {
  const supabase = SupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    throw new Error(error.message);
  }
}

// 인증 상태 변경 이벤트 리스너 등록
export function onAuthStateChange(
  callback: (event: string, session: Session | null) => void,
) {
  const supabase = SupabaseBrowserClient();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    console.log("Auth state changed:", event, session?.user?.id);
    callback(event, session);
  });

  return subscription;
}
