/**
 * Supabase 쿼리 공통 래퍼
 * - 에러 정규화
 * - 로깅
 * - 트레이싱 (선택적)
 */

import { logError, normalizeSupabaseError } from "@/shared/api/errors";
import type { SupabaseClient } from "@supabase/supabase-js";
import { SupabaseServerClient } from "./supabase-server-client";

/**
 * 서버 Supabase 쿼리 실행 (에러 정규화 + 로깅)
 *
 * @example
 * const posts = await querySupabase((supabase) =>
 *   supabase.from('posts').select('*').eq('category', 'tech')
 * );
 */
export async function querySupabase<T>(
  queryFn: (client: SupabaseClient) => Promise<{ data: T | null; error: any }>,
): Promise<T> {
  try {
    const supabase = await SupabaseServerClient();
    const { data, error } = await queryFn(supabase);

    if (error) {
      throw normalizeSupabaseError(error);
    }

    if (data === null) {
      throw normalizeSupabaseError({
        code: "PGRST116",
        message: "No data found",
      });
    }

    return data;
  } catch (err) {
    logError(err, "Supabase Query");
    throw err;
  }
}

/**
 * 단일 레코드 쿼리 (null 허용)
 */
export async function querySupabaseSingle<T>(
  queryFn: (client: SupabaseClient) => Promise<{ data: T | null; error: any }>,
): Promise<T | null> {
  try {
    const supabase = await SupabaseServerClient();
    const { data, error } = await queryFn(supabase);

    if (error) {
      throw normalizeSupabaseError(error);
    }

    return data;
  } catch (err) {
    logError(err, "Supabase Single Query");
    throw err;
  }
}
