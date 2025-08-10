import { signUp } from "@/entities/auth/api/sign";
import { updateProfile } from "@/entities/profile";
import { decryptObject } from "@/shared/utils/crypto-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
  } catch (error) {
    console.error("Sign-up error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "회원가입에 실패했습니다.",
      },
      { status: 400 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const decryptedBody: {
      nickname: string;
      gender: string;
    } = decryptObject(body);

    await updateProfile(decryptedBody);

    return NextResponse.json(true);
  } catch (error) {
    console.error("Profile update error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "프로필 업데이트에 실패했습니다.",
      },
      { status: 400 },
    );
  }
}
