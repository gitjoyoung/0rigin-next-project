// shared/auth/AuthClientProvider.tsx
"use client";

import type { SignupStatusResponse } from "@/entities/auth/model/dto";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { SupabaseBrowserClient } from "../../shared/lib/supabase/supabase-browser-client";

// 인증 상태 타입
export type Status = "loading" | "unauth" | "needsProfile" | "authed";

// 상태 Context
const AuthStateContext = createContext<SignupStatusResponse>({
  status: "unauth",
  user: null,
  profile: undefined,
});
export const useAuthState = () => useContext(AuthStateContext);

// 액션 Context
const AuthActionContext = createContext<{ logout: () => Promise<void> }>({
  logout: async () => {},
});
export const useAuthActions = () => useContext(AuthActionContext);

export function AuthClientProvider({
  initial,
  children,
}: {
  initial: SignupStatusResponse;
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => SupabaseBrowserClient(), []);
  const [snap, setSnap] = useState<SignupStatusResponse>({
    ...initial,
  });

  // 로그아웃 함수
  const logout = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  useEffect(() => {
    const sync = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setSnap({ status: "unauth", user: null, profile: undefined });
        return;
      }
      // 사용자만 확인하고 profile은 서버에서 받은 것 사용
      setSnap((prevSnap) => ({
        status: prevSnap.profile ? "authed" : "needsProfile",
        user,
        profile: prevSnap.profile, // 기존 profile 유지
      }));
    };

    sync();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      sync();
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase.auth]); // supabase.auth 의존성 추가

  return (
    <AuthStateContext.Provider value={snap}>
      <AuthActionContext.Provider value={{ logout }}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
}
