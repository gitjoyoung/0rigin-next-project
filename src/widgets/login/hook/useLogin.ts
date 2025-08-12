"use client";

import { encryptObject } from "@/shared/utils/crypto-helper";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { LoginSchema } from "../types/schema";

// 로그인 API 요청 함수 분리
const fetchLogin = async (values: z.infer<typeof LoginSchema>) => {
  const encryptedValues = encryptObject(values);
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/api/auth/sign-in",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(encryptedValues),
    },
  );

  const result = await response.json();

  // API에서 에러를 반환한 경우
  if (result.error) {
    throw new Error(result.error);
  }

  return result;
};

// 로그인 훅
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
