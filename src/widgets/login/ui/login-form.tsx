"use client";
import { ROUTE_FORGET_PASSWORD, ROUTE_SIGN } from "@/constants/pathname";
import { LoginRequestSchema, type LoginRequest } from "@/entities/auth";
import { Button } from "@/shared/shadcn/ui/button";
import {
  Card,
  CardContent,
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
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>로그인</CardTitle>
      </CardHeader>
      <CardContent>
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
                    <Input
                      disabled={isPending}
                      type="email"
                      placeholder="이메일"
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
                    <Input
                      disabled={isPending}
                      type="password"
                      placeholder="비밀번호"
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

          <div className="my-2 flex gap-4 justify-between">
            <Button disabled={isPending} variant="outline" asChild>
              <Link href={ROUTE_SIGN}>회원가입</Link>
            </Button>
            <Button disabled={isPending} variant="outline" asChild>
              <Link href={ROUTE_FORGET_PASSWORD}>비밀번호 분실</Link>
            </Button>
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}
