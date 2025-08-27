"use client";

import { FormControl, FormItem, FormMessage } from "@/shared/shadcn/ui/form";
import { FloatingInput, type FloatingInputProps } from "./floating-input";

export interface FloatingFormFieldProps extends FloatingInputProps {
  children?: never;
}

export function FloatingFormField({ label, ...props }: FloatingFormFieldProps) {
  return (
    <FormItem>
      <FormControl>
        <FloatingInput label={label} {...props} />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
