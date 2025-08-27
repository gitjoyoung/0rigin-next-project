"use client";

import type { LoginRequest } from "@/entities/auth/model";
import { encryptObject } from "@/shared/utils/crypto-helper";
import { useMutation } from "@tanstack/react-query";

// 로그인 API 요청 함수 분리
const fetchLogin = async (values: LoginRequest) => {
  const encryptedValues = encryptObject(values);
  const response = await fetch("/api/auth/sign-in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encryptedValues),
  });

  const result = await response.json();

  // 에러 응답 처리
  if (!response.ok) {
    throw new Error(result.error || "로그인에 실패했습니다.");
  }

  return result;
};

export const useLogin = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: () => {
      window.location.href = "/";
    },
    onError: (error) => {
      console.log("Login mutation error:", error);
    },
  });

  console.log("useLogin state:", { error: error?.message, isPending });

  return {
    loginError: error?.message ?? null,
    mutate,
    isPending,
  };
};
