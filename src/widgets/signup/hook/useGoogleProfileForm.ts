"use client";

import {
  GoogleProfileSchema,
  type GoogleProfileParams,
} from "@/shared/utils/validators/auth/google-profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// 구글 프로필 폼 훅
export const useGoogleProfileForm = () => {
  const form = useForm<GoogleProfileParams>({
    resolver: zodResolver(GoogleProfileSchema),
    defaultValues: {
      nickname: "",
      gender: "etc",
    },
    mode: "onChange",
  });

  return form;
};
