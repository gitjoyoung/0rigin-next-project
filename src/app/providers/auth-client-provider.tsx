// shared/auth/AuthClientProvider.tsx
"use client";

import {
  checkAuthStatus,
  onAuthStateChange,
  signOut,
} from "@/entities/auth/api/client-sessions";
import type { SignupStatusResponse } from "@/entities/auth/model";
import { createContext, useContext, useEffect, useState } from "react";

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
  const [snap, setSnap] = useState<SignupStatusResponse>({
    ...initial,
  });

  // 로그아웃 함수
  const logout = async () => {
    await signOut();
    window.location.reload();
  };

  useEffect(() => {
    const sync = async () => {
      const authStatus = await checkAuthStatus();
      setSnap({
        status: authStatus.status,
        user: authStatus.user,
        profile: authStatus.profile || undefined,
      });
    };

    sync();
    const subscription = onAuthStateChange((event) => {
      console.log("Auth state changed:", event);
      sync();
    });

    return () => subscription.unsubscribe();
  }, []); // 의존성 배열 단순화

  return (
    <AuthStateContext.Provider value={snap}>
      <AuthActionContext.Provider value={{ logout }}>
        {children}
      </AuthActionContext.Provider>
    </AuthStateContext.Provider>
  );
}
