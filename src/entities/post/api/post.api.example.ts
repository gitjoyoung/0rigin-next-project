/**
 * 권장 패턴 예시: Supabase + 에러 정규화
 *
 * Before: 직접 Supabase 호출 + 에러 처리 반복
 * After: querySupabase wrapper + 표준화된 에러
 */

import { TABLE_NAMES } from "@/shared/constants/table-names";
import {
  querySupabase,
  querySupabaseSingle,
} from "@/shared/lib/supabase/supabase-query";
import type { Post, PostQueryParams } from "../types";

// ✅ 권장: querySupabase wrapper 사용
export async function getPostListNew(params: PostQueryParams) {
  return querySupabase<Post[]>((supabase) => {
    let query = supabase.from(TABLE_NAMES.POSTS).select("*");

    if (params.category) {
      query = query.eq("category", params.category);
    }

    return query
      .order("created_at", { ascending: false })
      .range(0, (params.limit ?? 20) - 1);
  });
}

// ✅ 권장: 단일 레코드 (null 허용)
export async function getPostByIdNew(id: number) {
  return querySupabaseSingle<Post>((supabase) =>
    supabase.from(TABLE_NAMES.POSTS).select("*").eq("id", id).single(),
  );
}

// ❌ 이전 방식: 에러 처리 반복
export async function getPostListOld(params: PostQueryParams) {
  const supabase = await SupabaseServerClient();

  const { data, error } = await supabase
    .from("posts") // 하드코딩
    .select("*")
    .eq("category", params.category);

  if (error) {
    // 에러 처리 반복 + 불일관
    throw new Error(error.message);
  }

  return data;
}

// 📊 비교
/*
✅ New (querySupabase):
- TABLE_NAMES 사용 (타입 안전)
- 에러 자동 정규화
- 로깅 자동 추가
- null 처리 일관성

❌ Old (직접 호출):
- 하드코딩 오타 위험
- 에러 처리 중복
- null 체크 수동
- 로깅 누락
*/
