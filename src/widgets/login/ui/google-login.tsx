"use client";

import { signInWithGoogle } from "@/entities/auth";
import { Button } from "@/shared/shadcn/ui/button";
import { Chrome } from "lucide-react";

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    await signInWithGoogle({
      next: `${window.location.origin}/callback?next=${window.location.origin}/sign/complete-profile`,
    });
  };
  return (
    <form action={handleGoogleLogin}>
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
