"use client";

import type { Profile } from "@/entities/profile";
import { Button } from "@/shared/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/shadcn/ui/form";
import { Input } from "@/shared/shadcn/ui/input";
import { cn } from "@/shared/utils/cn";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { UseFormReturn, useForm } from "react-hook-form";
import LoadingModal from "../../common/loading-modal";
import MarkDownEditor from "../../common/mark-down-editor";
import type { BoardFormType } from "../../common/schema/board-schema";
import FormActionBuuton from "./ui/form-action-buuton";
import MarkDownTip from "./ui/markdown-tip";
import SearchPreview from "./ui/search-preview";

interface BoardFormProps {
  form: UseFormReturn<BoardFormType>;
  isSubmitting: boolean;
  onSubmit: (data: BoardFormType) => void;
  profile?: Profile | null;
}

export default function PostForm({
  form: externalForm,
  isSubmitting,
  onSubmit,
  profile,
}: BoardFormProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);

  // 외부에서 form이 전달되지 않으면 내부에서 생성
  const internalForm = useForm<BoardFormType>({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: undefined,
      summary: undefined,
      nickname: profile?.nickname || "",
      password: "",
    },
  });

  const form = externalForm || internalForm;

  return (
    <section className="w-full py-2">
      <LoadingModal isOpen={isSubmitting} />
      <Form {...form}>
        <form
          className="w-full flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* 닉네임 입력 필드 */}
          <div className="flex gap-2">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="w-full max-w-[180px]">
                  <FormControl>
                    <Input
                      className={cn(
                        "text-sm sm:text-base ",
                        profile?.nickname ? "border-none" : "border",
                      )}
                      placeholder="닉네임"
                      disabled={!!profile}
                      {...field}
                      value={profile?.nickname ?? field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!profile && (
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full max-w-[180px]">
                      <FormControl>
                        <div className="relative">
                          <Input
                            className="text-sm sm:text-base pr-10"
                            placeholder="비밀번호"
                            minLength={4}
                            maxLength={8}
                            type={passwordVisible ? "text" : "password"}
                            autoComplete="new-password"
                            {...field}
                          />
                          <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            className="absolute right-0 top-1/2 -translate-y-1/2"
                            onClick={() => setPasswordVisible((v) => !v)}
                          >
                            {passwordVisible ? (
                              <EyeIcon className="w-4 h-4" />
                            ) : (
                              <EyeOffIcon className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            )}
          </div>
          {/* 제목 입력 필드 */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="text-sm sm:text-base"
                    placeholder="제목을 입력해주세요"
                    disabled={isSubmitting}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 마크다운 사용법 */}
          <MarkDownTip />

          {/* 마크다운 입력 필드 */}
          <MarkDownEditor
            name="content"
            value={form.watch("content") || ""}
            onChange={(value) => form.setValue("content", value)}
          />

          {/* 구글 검색 결과 스타일 프리뷰 */}
          <SearchPreview form={form} />

          <FormActionBuuton isSubmitting={isSubmitting} />
        </form>
      </Form>
    </section>
  );
}
