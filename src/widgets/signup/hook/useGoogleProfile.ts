"use client";

import { encryptObject } from "@/shared/utils/crypto-helper";
import type { GoogleProfileParams } from "@/shared/utils/validators/auth/google-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 구글 프로필 생성 API 요청 함수
const fetchGoogleProfile = async (values: GoogleProfileParams) => {
  try {
    const encryptedValues = encryptObject(values);
    const response = await fetch("/api/auth/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(encryptedValues),
    });

    if (!response.ok) {
      return { success: false, message: "프로필 생성에 실패했습니다." };
    }

    const result = await response.json();
    console.log("API 응답:", result);
    return result;
  } catch (error) {
    return { success: false, message: "프로필 생성에 실패했습니다." };
  }
};

// 구글 프로필 생성 훅
export const useGoogleProfile = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate,
    error,
    isPending = false,
  } = useMutation({
    mutationKey: ["google-profile"],
    mutationFn: fetchGoogleProfile,
    onSuccess: (data) => {
      console.log("성공 콜백 데이터:", data);
      if (data.success) {
        console.log("웰컴 페이지로 이동");
        // 사용자 정보 캐시 무효화
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/sign/welcome");
      } else {
        console.log("성공이지만 data.success가 false:", data);
      }
    },
    onError: (error) => {
      console.error("에러 콜백:", error);
    },
  });

  return {
    error: error?.message || "",
    isPending,
    mutate,
  };
};
