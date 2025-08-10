import { signIn } from "@/entities/auth/api/sign";
import { decryptObject } from "@/shared/utils/crypto-helper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, email } = decryptObject(body) as {
      email: string;
      password: string;
    };

    const result = await signIn({ password, email });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Sign-in error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "로그인에 실패했습니다.",
      },
      { status: 400 },
    );
  }
}
