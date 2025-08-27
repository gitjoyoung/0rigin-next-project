"use client";

import type { SignUpRequest } from "@/entities/auth/model";
import { encryptObject } from "@/shared/utils/crypto-helper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

interface SignUpResponse {
  user: any;
  session: any;
}

// 회원가입 API 요청 함수
const fetchSignUp = async (values: SignUpRequest): Promise<SignUpResponse> => {
  const encryptedValues = encryptObject(values);
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(encryptedValues),
  });

  const result = await response.json();
  console.log("SignUp response:", { status: response.status, result });

  if (!response.ok) {
    // 서버에서 반환한 구체적인 에러 메시지 사용
    throw new Error(
      result.error || `서버 오류: ${response.status} ${response.statusText}`,
    );
  }

  return result;
};

// 일반 회원가입 훅
export const useUserSignUp = () => {
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
      if (data.user) {
        // 인증 상태 무효화 및 새로고침 강제
        queryClient.invalidateQueries({ queryKey: ["user"] });
        queryClient.invalidateQueries({ queryKey: ["auth"] });

        // 브라우저 세션 동기화를 위해 잠시 대기 후 이동
        setTimeout(() => {
          window.location.href = "/sign/welcome"; // 강제 새로고침으로 상태 동기화
        }, 100);
      }
    },
    onError: (error) => {
      console.log("error", error);
    },
  });

  const handleSubmit = (data: SignUpRequest) => {
    mutate(data);
  };

  return {
    error: error?.message || "",
    isPending,
    mutate,
    handleSubmit,
  };
};
