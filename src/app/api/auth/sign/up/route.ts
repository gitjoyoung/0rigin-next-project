import { signUp } from "@/entities/auth/api/sign";
import { updateProfile } from "@/entities/profile";
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
  });
  return NextResponse.json(result);
}

export async function PUT(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const decryptedBody: {
    nickname: string;
    gender: string;
  } = decryptObject(body);

  await updateProfile(decryptedBody);

  return NextResponse.json(true);
}
