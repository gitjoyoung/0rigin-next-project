"use client";

import {
  SignUpParamsSchema,
  type SignUpParams,
} from "@/entities/auth/types/sign-up";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// 일반 회원가입 폼 훅
export const useSignUpForm = () => {
  const form = useForm<SignUpParams>({
    resolver: zodResolver(SignUpParamsSchema),
    defaultValues: {
      email: "",
      gender: "man",
      nickname: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  return form;
};
