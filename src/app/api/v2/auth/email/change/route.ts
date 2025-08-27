import { getUser } from "@/entities/auth/api/user";
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const user = await getUser();
    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "새 이메일 주소를 입력해주세요." },
        { status: 400 },
      );
    }

    const supabase = await SupabaseServerClient();

    // 이메일 변경 요청
    const { error } = await supabase.auth.updateUser({
      email,
    });

    if (error) {
      return NextResponse.json(
        { error: "이메일 변경 요청에 실패했습니다." },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "새 이메일 주소로 인증 메일을 발송했습니다.",
    });
  } catch (error) {
    console.error("Email change error:", error);
    return NextResponse.json(
      { error: "이메일 변경 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
