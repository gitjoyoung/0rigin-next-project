import { signOut } from "@/entities/auth/api/sign";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const result = await signOut();
    return NextResponse.json(result);
  } catch (error) {
    console.error("Sign-out error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "로그아웃에 실패했습니다.",
      },
      { status: 400 },
    );
  }
}
