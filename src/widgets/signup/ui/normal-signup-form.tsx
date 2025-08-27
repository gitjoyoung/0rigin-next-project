"use client";

import { Button } from "@/shared/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/shadcn/ui/form";
import { Input } from "@/shared/shadcn/ui/input";
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { RefreshCcw } from "lucide-react";
import { useSignUpForm } from "../hook/useSignUpForm";
import { useUserSignUp } from "../hook/useUserSignUp";
import GenderRadioButton from "./gender-radio-button";

export default function NormalSignUpForm() {
  const { handleSubmit, isPending, error } = useUserSignUp();
  const form = useSignUpForm();

  const onSubmit = form.handleSubmit((data) => {
    handleSubmit(data);
  });

  return (
    <section className="w-full flex justify-center">
      {isPending && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <RefreshCcw className="h-8 w-8 animate-spin text-white" />
            <p className="text-white">회원가입 처리중...</p>
          </div>
        </div>
      )}

      <Card className="w-full max-w-[350px]">
        <CardHeader className="flex flex-col">
          <CardTitle className="text-2xl">0rigin 회원가입</CardTitle>
          <CardDescription className="text-transparent text-sm">
            자유 의지란 존재하나요?
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* 성별 선택 */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <GenderRadioButton disabled={isPending} {...field} />
                )}
              />

              {/* 이메일 입력 */}
              <FormField
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="이메일"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-red-500" />
                    )}
                  </FormItem>
                )}
              />

              {/* 닉네임 입력 */}
              <FormField
                control={form.control}
                name="nickname"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="닉네임을 입력하세요"
                        maxLength={12}
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-red-500" />
                    )}
                  </FormItem>
                )}
              />

              {/* 비밀번호 입력 */}
              <FormField
                control={form.control}
                name="password"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="비밀번호를 입력하세요"
                        type="password"
                        maxLength={20}
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-red-500" />
                    )}
                  </FormItem>
                )}
              />

              {/* 비밀번호 확인 */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="비밀번호 재확인"
                        type="password"
                        maxLength={20}
                        autoComplete="new-password"
                        {...field}
                      />
                    </FormControl>
                    {fieldState.error && (
                      <FormMessage className="text-xs text-red-500" />
                    )}
                  </FormItem>
                )}
              />

              {/* 에러 메시지 */}
              {error && (
                <p className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-center whitespace-pre-line font-medium leading-relaxed text-red-600">
                  {error}
                </p>
              )}

              {/* 제출 버튼 */}
              <Button
                disabled={isPending}
                type="submit"
                className="w-full"
                variant="default"
              >
                <div className="flex items-center justify-center gap-2">
                  {isPending && <LoadingSpinner className="h-4 w-4" />}
                  {isPending ? "처리중..." : "회원가입"}
                </div>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
