import { ProfileData } from "@/entities/profile";
import { getProfile } from "@/entities/profile/api";
import { SupabaseBrowserClient } from "@/shared/lib/supabase/supabase-browser-client";
import { Session, User } from "@supabase/supabase-js";

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

// 로그아웃
export async function signOut(): Promise<void> {
  const supabase = SupabaseBrowserClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    throw error;
  }
}

// 인증 상태 확인
export async function checkAuthStatus(): Promise<{
  status: "auth" | "unauth";
  user: User | null;
  profile: ProfileData | null;
}> {
  const user = await getCurrentUser();

  if (!user) {
    return {
      status: "unauth",
      user: null,
      profile: null,
    };
  }

  try {
    const profile = await getProfile(user.id);
    return {
      status: "auth",
      user,
      profile,
    };
  } catch (error) {
    console.error("Profile fetch error:", error);
    return {
      status: "auth",
      user,
      profile: null,
    };
  }
}

// 인증 상태 변경 감지
export function onAuthStateChange(callback: (event: string) => void): {
  unsubscribe: () => void;
} {
  const supabase = SupabaseBrowserClient();

  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    callback(event);
  });

  return {
    unsubscribe: () => subscription.unsubscribe(),
  };
}
