"use client";

import type { SignUpRequest } from "@/entities/auth";
import { encryptObject } from "@/shared/utils/crypto-helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface SignUpResponse {
  success: boolean;
  message: string;
  errors?: any[];
}

// 회원가입 API 요청 함수
const fetchSignUp = async (values: SignUpRequest): Promise<SignUpResponse> => {
  try {
    const encryptedValues = encryptObject(values);
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(encryptedValues),
    });

    if (!response.ok) {
      return {
        success: false,
        message: `서버 오류: ${response.status} ${response.statusText}`,
      };
    }

    const contentType = response.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return {
        success: false,
        message: "서버 응답 형식이 올바르지 않습니다.",
      };
    }

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "네트워크 오류가 발생했습니다.",
    };
  }
};

// 일반 회원가입 훅
export const useUserSignUp = () => {
  const [serverMessage, setServerMessage] = useState("");
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate,
    error,
    isPending = false,
  } = useMutation({
    mutationKey: ["signup"],
    mutationFn: fetchSignUp,
    onSuccess: (data) => {
      if (data.success) {
        // 사용자 정보 캐시 무효화
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/sign/welcome");
      } else {
        setServerMessage(data.message || "회원가입에 실패했습니다.");
      }
    },
  });

  const handleSubmit = (data: SignUpRequest) => {
    mutate(data);
  };

  return {
    error: error?.message || "",
    isPending,
    mutate,
    serverMessage,
    handleSubmit,
  };
};
