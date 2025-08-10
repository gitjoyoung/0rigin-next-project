import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, type } = body;

    if (!token || typeof token !== "string") {
      return NextResponse.json(
        { error: "인증 토큰이 필요합니다." },
        { status: 400 },
      );
    }

    const supabase = await SupabaseServerClient();

    // 이메일 인증 처리
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type || "email",
    });

    if (error) {
      return NextResponse.json(
        { error: "이메일 인증에 실패했습니다." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "이메일 인증이 완료되었습니다.",
      user: data.user,
    });
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json(
      { error: "이메일 인증 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
