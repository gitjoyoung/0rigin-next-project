import { resetPassword } from "@/entities/auth/api/reset-password";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "이메일 주소를 입력해주세요." },
        { status: 400 },
      );
    }

    const result = await resetPassword(email);

    if (!result.success) {
      return NextResponse.json({ error: result.message }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "비밀번호 재설정 요청 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
