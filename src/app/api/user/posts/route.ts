import { getUser } from "@/entities/auth/api/user";
import { getPostsByUserId } from "@/entities/post";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();

    if (!user?.id) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 },
      );
    }

    const posts = await getPostsByUserId(user.id);

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("사용자 게시글 조회 실패:", error);
    return NextResponse.json(
      { error: "게시글을 가져올 수 없습니다." },
      { status: 500 },
    );
  }
}
