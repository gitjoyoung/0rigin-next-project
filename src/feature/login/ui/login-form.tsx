"use client";
import { ROUTE_FORGET_PASSWORD, ROUTE_SIGN } from "@/constants/pathname";
import { LoginRequestSchema, type LoginRequest } from "@/entities/auth/model";
import { Button } from "@/shared/shadcn/ui/button";
import { Card, CardHeader } from "@/shared/shadcn/ui/card";
import { FloatingInput } from "@/shared/shadcn/ui/floating-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/shadcn/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useLogin } from "../hook/useLogin";
import GoogleLogin from "./google-login";

export default function LoginForm() {
  const { loginError, mutate, isPending } = useLogin();
  const form = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <article className="w-full max-w-md flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((formData) => {
                mutate(formData);
              })}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingInput
                        disabled={isPending}
                        type="email"
                        label="이메일"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <FloatingInput
                        disabled={isPending}
                        type="password"
                        label="비밀번호"
                        autoComplete="current-password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loginError && (
                <div className="text-sm text-red-500 text-center mt-2">
                  {loginError}
                </div>
              )}
              <Button className="w-full" type="submit" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    로그인 중...
                  </>
                ) : (
                  "로그인"
                )}
              </Button>
            </form>
            {/* 구글 로그인 */}
            <div className="my-2">
              <GoogleLogin />
            </div>
          </Form>
        </CardHeader>
      </Card>
      <div className="w-full flex gap-2 justify-center items-center text-xs text-muted-foreground">
        <Link href={ROUTE_FORGET_PASSWORD}>비밀번호 찾기</Link>
        <span>|</span>
        <Link href={ROUTE_SIGN}>회원가입</Link>
      </div>
    </article>
  );
}
