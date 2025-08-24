"use client";

import { oauthClient } from "@/entities/auth/api/oauth-client";
import { Button } from "@/shared/shadcn/ui/button";
import { Chrome } from "lucide-react";

export default function GoogleLogin() {
  const handleGoogleLogin = async () => {
    await oauthClient();
  };
  return (
    <Button
      type="button"
      onClick={handleGoogleLogin}
      variant="outline"
      className="w-full flex items-center justify-center gap-2"
    >
      <Chrome className="w-5 h-5" />
      <span>Google로 계속하기</span>
    </Button>
  );
}
