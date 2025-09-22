"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/shadcn/ui/form";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { QuestionFormData } from "../types/quiz-form-types";

interface QuestionExplanationInputProps {
  form: UseFormReturn<QuestionFormData>;
}

export function QuestionExplanationInput({
  form,
}: QuestionExplanationInputProps) {
  return (
    <FormField
      control={form.control}
      name="explanation"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-sm font-medium">힌트 (선택사항)</FormLabel>
          <FormControl>
            <Textarea
              placeholder="힌트를 입력해주세요"
              className="border-gray-200"
              rows={2}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
