"use client";

import { toast } from "@/shared/hooks/use-toast";
import { encryptObject } from "@/shared/utils/crypto-helper";
import type { GoogleProfileParams } from "@/shared/utils/validators/auth/google-profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

// 구글 프로필 생성 API 요청 함수
const fetchGoogleProfile = async (
  values: GoogleProfileParams & { userId: string; email: string },
) => {
  try {
    const encryptedValues = encryptObject(values);
    const response = await fetch("/api/auth/google-profile", {
      method: "POST",
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
export const useGoogleProfile = (userId: string, email: string) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate,
    error,
    isPending = false,
  } = useMutation({
    mutationKey: ["google-profile"],
    mutationFn: (values: GoogleProfileParams) => {
      return fetchGoogleProfile({
        ...values,
        userId: userId,
        email: email,
      });
    },
    onSuccess: (data) => {
      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
        router.push("/sign/welcome");
      } else {
        toast({
          title: "프로필 생성에 실패했습니다.",
          description: data.message,
          variant: "destructive",
        });
      }
    },
    onError: (error) => {
      toast({
        title: "프로필 생성에 실패했습니다.",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return {
    error: error?.message || "",
    isPending,
    mutate,
  };
};
