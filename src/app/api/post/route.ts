import { getCategoryBySlug } from "@/entities/category";
import { createPost } from "@/entities/post";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// 간단한 revalidation 함수 (API 호출 없이 직접 처리)
async function triggerRevalidation(category: string) {
  try {
    // 모든 환경에서 직접 revalidate (간단하고 빠름)
    revalidatePath(`/board/${category}`);
    revalidatePath("/board/latest"); // 전체 게시판도 재생성
    revalidatePath("/sitemap.xml"); // 사이트맵도 재생성

    console.log(`🔄 Revalidated paths for category: ${category}`);
  } catch (error) {
    console.warn("⚠️ Revalidation failed (non-critical):", error);
  }
}

// POST /api/post
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const post = await createPost(body);

    // 게시물 생성 후 해당 카테고리 페이지 재생성
    if (post.category) {
      // 카테고리 정보 조회해서 slug 얻기
      const categoryInfo = await getCategoryBySlug(post.category);
      if (categoryInfo) {
        await triggerRevalidation(categoryInfo.slug);
      }
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("게시글 생성 에러:", error);
    return NextResponse.json(
      { error: "게시글 생성에 실패했습니다." },
      { status: 500 },
    );
  }
}
