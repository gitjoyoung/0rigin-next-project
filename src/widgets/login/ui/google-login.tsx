"use client";

import { signInWithGoogle } from "@/entities/auth";
import { Button } from "@/shared/shadcn/ui/button";
import { Chrome } from "lucide-react";

export default function GoogleLogin() {
  const getOrigin = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  };
  return (
    <form
      action={async () => {
        await signInWithGoogle({
          next: `${getOrigin()}/callback?next=${getOrigin()}/sign/complete-profile`,
        });
      }}
    >
      <Button
        variant="outline"
        className="w-full flex items-center justify-center gap-2"
      >
        <Chrome className="w-5 h-5" />
        <span>Google로 계속하기</span>
      </Button>
    </form>
  );
}
