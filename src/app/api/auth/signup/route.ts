import { signUp } from "@/entities/auth/api/sign-up";
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

  const result = await signUp(decryptedBody);
  return NextResponse.json(result);
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const decryptedBody: {
      nickname: string;
      gender: string;
    } = decryptObject(body);

    await updateProfile(decryptedBody);
    return NextResponse.json({
      success: true,
      message: "프로필이 업데이트되었습니다.",
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "프로필 업데이트에 실패했습니다.",
    });
  }
}
