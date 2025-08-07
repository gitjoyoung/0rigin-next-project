"use client";

import { signInWithGoogle } from "@/entities/auth/api/google";
import { Button } from "@/shared/shadcn/ui/button";
import { Chrome } from "lucide-react";

export default function GoogleLogin() {
  return (
    <form
      action={async () => {
        await signInWithGoogle({
          next: "/sign/complete-profile?required=true",
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
