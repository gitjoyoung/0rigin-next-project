import { signUp } from "@/entities/auth/api/auth";
import { updateProfile } from "@/entities/profile";
import { decryptObject } from "@/shared/utils/crypto-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
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

    console.log("프로필 업데이트 요청:", decryptedBody);

    await updateProfile(decryptedBody);

    return NextResponse.json({
      success: true,
      message: "프로필이 완성되었습니다.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "프로필 생성에 실패했습니다.",
      },
      { status: 400 },
    );
  }
}
