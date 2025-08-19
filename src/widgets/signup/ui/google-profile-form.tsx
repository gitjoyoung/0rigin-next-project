"use client";

import { useUser } from "@/shared/hooks/auth";
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
import { LoadingSpinner } from "@/shared/ui/loading-spinner";
import { Check, Frown, RefreshCcw } from "lucide-react";
import { useGoogleProfile } from "../hook/useGoogleProfile";
import { useGoogleProfileForm } from "../hook/useGoogleProfileForm";
import GenderRadioButton from "./gender-radio-button";

export default function GoogleProfileForm() {
  const { data: user } = useUser();
  const { error, mutate, isPending } = useGoogleProfile();
  const form = useGoogleProfileForm();

  const handleSubmit = form.handleSubmit((data) => {
    mutate(data);
  });

  return (
    <section className="w-full flex justify-center">
      {isPending && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-4">
            <RefreshCcw className="h-8 w-8 animate-spin text-white" />
            <p className="text-white">프로필 생성 중...</p>
          </div>
        </div>
      )}

      <Card className="w-full max-w-[350px]">
        <CardHeader className="flex flex-col  gap-2">
          <CardTitle className="text-xl">Google Oauth 회원 가입</CardTitle>
          <div className="flex items-center gap-1">
            <Check className="w-3 h-3 text-blue-500" />
            <p className="text-sm text-muted-foreground">{user?.user?.email}</p>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 성별 선택 */}
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <GenderRadioButton disabled={isPending} {...field} />
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

              {/* 에러 메시지 */}
              {error && (
                <div className="flex justify-center items-center gap-1 text-red-500">
                  <Frown className="w-4 h-4" />
                  <p className="text-xs text-center">{error}</p>
                </div>
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
                  {isPending ? "생성 중..." : "프로필 완성하기"}
                </div>
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
}
