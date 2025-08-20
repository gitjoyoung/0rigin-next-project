"use client";

import { Button } from "@/shared/shadcn/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/shared/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/ui/select";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { cn } from "@/shared/utils/cn";
import { UseFormReturn } from "react-hook-form";

interface SearchInputProps {
  className?: string;
  form: UseFormReturn<{ category: string; question: string }>;
  onSubmit: (data: { category: string; question: string }) => void;
  isLoading?: boolean;
}

const categories = [
  { id: "philosophy", title: "철학" },
  { id: "science", title: "과학" },
  { id: "technology", title: "기술" },
  { id: "mathematics", title: "수학" },
];

const SearchInput = ({
  form,
  className,
  onSubmit,
  isLoading = false,
}: SearchInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form.getValues());
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        {/* 폼 영역 */}
        <div
          className={cn(
            "bg-transparent border border-black dark:border-[#1a1a1a] dark:bg-[#1a1a1a] p-5",
            className,
          )}
        >
          {/* 텍스트 입력 영역 */}
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormControl>
                  <Textarea
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && (e.metaKey || e.altKey)) {
                        e.preventDefault();
                        if (!isLoading) {
                          form.handleSubmit(onSubmit)();
                        }
                      }
                    }}
                    {...field}
                    disabled={isLoading}
                    placeholder="나와 같은 고민을 찾아보기..."
                    className="w-full h-24 p-4 bg-transparent border border-black dark:border-[#1a1a1a] dark:bg-black text-foreground placeholder-muted-foreground resize-none focus:outline-none focus:border-black dark:focus:border-gray-800 transition-colors text-sm rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 하단 컨트롤 영역 */}
          <div className="flex items-center gap-4 justify-between">
            {/* 드롭다운 */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-36 h-10 rounded-none border-black dark:border-[#1a1a1a] dark:bg-black">
                        <SelectValue placeholder="카테고리" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none p-1 border-black dark:border-[#1a1a1a] dark:bg-black">
                        {categories.map((category) => (
                          <SelectItem
                            className="rounded-none border-black dark:border-[#1a1a1a] dark:bg-black"
                            key={category.id}
                            value={category.id}
                          >
                            {category.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 검색 버튼 */}
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!form.watch("question").trim() || isLoading}
              className="px-8 h-10 rounded-none"
            >
              {isLoading ? "처리 중..." : "제출 하기"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default SearchInput;
