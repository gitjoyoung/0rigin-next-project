"use client";

import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { useEffect, useRef } from "react";

interface QuizTitleInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function QuizTitleInput({ value, onChange }: QuizTitleInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = value;
    }
  }, [value]);

  return (
    <div className="flex-1">
      <Label>퀴즈 제목 *</Label>
      <Input
        ref={inputRef}
        placeholder="예: JavaScript 기초 퀴즈"
        maxLength={100}
        className="text-lg font-medium mt-1"
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="flex justify-between items-center text-xs text-muted-foreground mt-1">
        <span></span>
        <span>{value.length}/100</span>
      </div>
    </div>
  );
}
