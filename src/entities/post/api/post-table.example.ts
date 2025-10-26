/**
 * 예시: TABLE_NAMES 상수 적용 후
 *
 * Before/After 비교를 위한 예시 파일
 */

import { TABLE_NAMES } from "@/shared/constants/table-names";
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";

// ❌ 이전 방식: 하드코딩
export async function getPostListOld() {
  const supabase = await SupabaseServerClient();

  const { data } = await supabase
    .from("posts") // ← 오타 위험, 변경 어려움
    .select("*");

  return data;
}

// ✅ 개선 방식: 상수 사용
export async function getPostListNew() {
  const supabase = await SupabaseServerClient();

  const { data } = await supabase
    .from(TABLE_NAMES.POSTS) // ← 타입 안전, 자동 완성, 변경 용이
    .select("*");

  return data;
}

// ✅ 장점 1: 타이핑 오류 방지
// .from('postss') ← 컴파일 에러 없음
// .from(TABLE_NAMES.POSTSS) ← 컴파일 에러 발생!

// ✅ 장점 2: 테이블 이름 변경 시
// "posts" → "blog_posts" 변경하려면?
// Before: 8개 파일 모두 찾아서 수정
// After: table-names.ts 한 곳만 수정

// ✅ 장점 3: 자동 완성
// TABLE_NAMES. 입력 시 모든 테이블 목록 표시
