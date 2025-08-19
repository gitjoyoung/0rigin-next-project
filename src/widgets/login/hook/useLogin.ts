"use client";

import type { LoginRequest } from "@/entities/auth";
import { encryptObject } from "@/shared/utils/crypto-helper";
import { useMutation } from "@tanstack/react-query";

// 로그인 API 요청 함수 분리
const fetchLogin = async (values: LoginRequest) => {
  try {
    const encryptedValues = encryptObject(values); // 암호화
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/auth/sign-in",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(encryptedValues),
      },
    ).then((res) => res.json());

    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export const useLogin = () => {
  const { mutate, error, isPending } = useMutation({
    mutationFn: fetchLogin,
    onSuccess: (result) => {
      window.location.href = "/";
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });

  return {
    loginError: error?.message ?? null,
    mutate,
    isPending,
  };
};
