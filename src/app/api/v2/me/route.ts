import { getUser } from "@/entities/auth/api/user";
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

    // 사용자 요약 정보 반환
    return NextResponse.json({
      id: user.id,
      email: user.email,
      nickname:
        user.user_metadata?.nickname || user.user_metadata?.display_name,
      gender: user.user_metadata?.gender,
      email_confirmed_at: user.email_confirmed_at,
      created_at: user.created_at,
      updated_at: user.updated_at,
    });
  } catch (error) {
    console.error("Get user info error:", error);
    return NextResponse.json(
      { error: "사용자 정보를 가져올 수 없습니다." },
      { status: 500 },
    );
  }
}
