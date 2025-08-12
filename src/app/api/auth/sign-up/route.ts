import { signUp } from "@/entities/auth";
import { decryptObject } from "@/shared/utils/crypto-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const decryptedBody: {
    password: string;
    email: string;
    nickname: string;
    confirmPassword: string;
    gender: string;
  } = decryptObject(body);

  const result = await signUp({
    email: decryptedBody.email,
    password: decryptedBody.password,
    nickname: decryptedBody.nickname,
    gender: decryptedBody.gender as "man" | "women" | "etc",
    confirmPassword: decryptedBody.confirmPassword,
  });
  return NextResponse.json(result);
}
