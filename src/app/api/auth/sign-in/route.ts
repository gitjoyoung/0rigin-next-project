import { signIn } from "@/entities/auth/api/auth";
import { type LoginRequestSchema } from "@/entities/auth/model";
import { decryptObject } from "@/shared/utils/crypto-helper";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const decryptedBody =
      decryptObject<z.infer<typeof LoginRequestSchema>>(body);
    const { password, email } = decryptedBody;
    const result = await signIn({ password, email });
    return NextResponse.json(result);
  } catch (error) {
    console.error("Sign in error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "로그인에 실패했습니다.",
      },
      { status: 401 },
    );
  }
}
