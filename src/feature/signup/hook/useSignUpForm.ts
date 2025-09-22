"use client";

import { SignUpRequestSchema, type SignUpRequest } from "@/entities/auth/model";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

// 일반 회원가입 폼 훅
export const useSignUpForm = () => {
  const form = useForm<SignUpRequest>({
    resolver: zodResolver(SignUpRequestSchema),
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
