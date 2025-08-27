import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await SupabaseServerClient();

    // 현재 세션 확인 및 갱신
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();

    if (error) {
      return NextResponse.json(
        { error: "세션을 가져올 수 없습니다." },
        { status: 401 },
      );
    }

    if (!session) {
      return NextResponse.json(
        { error: "활성 세션이 없습니다." },
        { status: 401 },
      );
    }

    // 세션 갱신
    const { data: refreshedSession, error: refreshError } =
      await supabase.auth.refreshSession();

    if (refreshError) {
      return NextResponse.json(
        { error: "토큰 갱신에 실패했습니다." },
        { status: 401 },
      );
    }

    return NextResponse.json({
      session: refreshedSession.session,
      user: refreshedSession.user,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    return NextResponse.json(
      { error: "토큰 갱신 중 오류가 발생했습니다." },
      { status: 500 },
    );
  }
}
