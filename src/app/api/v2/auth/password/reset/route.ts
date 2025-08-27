import { updatePassword } from "@/entities/auth/api/password";
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password, code } = body;

    if (!password || typeof password !== "string") {
      return NextResponse.json(
        { error: "새 비밀번호를 입력해주세요." },
        { status: 400 },
      );
    }

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { error: "인증 코드가 필요합니다." },
        { status: 400 },
      );
    }

    const supabase = await SupabaseServerClient();

    // 인증 코드 검증 및 세션 설정
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      return NextResponse.json(
        { error: "인증 코드가 유효하지 않습니다." },
        { status: 400 },
      );
    }

    // 비밀번호 업데이트
    const result = await updatePassword(password);

    return NextResponse.json({
      success: true,
      message: "비밀번호가 성공적으로 변경되었습니다.",
    });
  } catch (error) {
    console.error("Password reset completion error:", error);
    return NextResponse.json(
      { error: "비밀번호 재설정 완료 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
