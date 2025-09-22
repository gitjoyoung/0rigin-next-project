"use client";

import { Button } from "@/shared/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { Textarea } from "@/shared/shadcn/ui/textarea";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { QuizFormData } from "../types/quiz-form-types";
import { QuizTitleInput } from "./quiz-title-input";

interface BasicInfoFormProps {
  formData: QuizFormData;
  onSubmit: (data: QuizFormData) => void;
  onFormDataChange: (data: QuizFormData) => void;
}

interface BasicInfoFormData {
  title: string;
  description: string;
  questionCount: number;
  pass_score: number;
}

export function BasicInfoForm({
  formData,
  onSubmit,
  onFormDataChange,
}: BasicInfoFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { isDirty },
  } = useForm<BasicInfoFormData>({
    defaultValues: {
      title: formData.title,
      description: formData.description || "",
      questionCount: formData.questionCount,
      pass_score: formData.pass_score,
    },
    mode: "onChange",
  });

  // formData prop이 변경되면 폼 값 업데이트
  useEffect(() => {
    setValue("title", formData.title);
    setValue("description", formData.description || "");
    setValue("questionCount", formData.questionCount);
    setValue("pass_score", formData.pass_score);
  }, [formData, setValue]);

  // 폼 값이 변경될 때마다 부모 컴포넌트에 업데이트
  const watchedValues = watch();
  useEffect(() => {
    if (isDirty) {
      onFormDataChange({
        ...formData,
        ...watchedValues,
      });
    }
  }, [watchedValues, onFormDataChange, formData, isDirty]);

  const onSubmitForm = (data: BasicInfoFormData) => {
    onSubmit({
      ...formData,
      ...data,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold">퀴즈 만들기</h1>
        <p className="text-muted-foreground mt-2">
          퀴즈의 기본 정보를 설정해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>퀴즈 기본 정보</CardTitle>
            <CardDescription>
              퀴즈의 제목, 설명, 문제 개수를 설정해주세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <QuizTitleInput value={field.value} onChange={field.onChange} />
              )}
            />

            <div>
              <Label>퀴즈 설명 (선택사항)</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    {...field}
                    placeholder="퀴즈에 대한 설명을 입력해주세요"
                    className="mt-1"
                  />
                )}
              />
            </div>

            <div>
              <Label>문제 개수</Label>
              <Controller
                name="questionCount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    max="20"
                    placeholder="문제 개수를 입력해주세요"
                    className="mt-1"
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 1)
                    }
                  />
                )}
              />
            </div>

            <div>
              <Label>합격 점수 (%)</Label>
              <Controller
                name="pass_score"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="1"
                    max="100"
                    className="mt-1"
                    onChange={(e) =>
                      field.onChange(parseInt(e.target.value) || 60)
                    }
                  />
                )}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="min-w-[120px]">
            다음 단계
          </Button>
        </div>
      </form>
    </div>
  );
}
