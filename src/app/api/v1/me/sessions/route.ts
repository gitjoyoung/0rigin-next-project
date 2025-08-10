import { getUser } from "@/entities/auth/api/get-user";
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const supabase = await SupabaseServerClient();
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { error: "세션 정보를 가져올 수 없습니다." },
        { status: 500 },
      );
    }

    if (!session) {
      return NextResponse.json(
        { error: "활성 세션이 없습니다." },
        { status: 401 },
      );
    }

    // 현재 세션 정보 반환 (민감한 정보 제외)
    return NextResponse.json({
      created_at: session.created_at,
      expires_at: session.expires_at,
      refresh_token: session.refresh_token ? "***" : null, // 보안상 실제 토큰은 숨김
      user: {
        id: session.user.id,
        email: session.user.email,
        last_sign_in_at: session.user.last_sign_in_at,
      },
    });
  } catch (error) {
    console.error("Get sessions error:", error);
    return NextResponse.json(
      { error: "세션 정보를 가져올 수 없습니다." },
      { status: 500 },
    );
  }
}

export async function DELETE() {
  try {
    const user = await getUser();

    if (!user) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const supabase = await SupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      return NextResponse.json(
        { error: "로그아웃에 실패했습니다." },
        { status: 500 },
      );
    }

    return NextResponse.json({
      success: true,
      message: "현재 세션이 종료되었습니다.",
    });
  } catch (error) {
    console.error("Delete session error:", error);
    return NextResponse.json(
      { error: "세션 종료 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
