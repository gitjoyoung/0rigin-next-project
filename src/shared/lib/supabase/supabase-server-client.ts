import { Database } from "@/shared/types";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import "server-only";

// 서버에서 Supabase를 쓸 때, 클라이언트의 로그인 상태(쿠키 기반 세션)를 읽어서 반영하고, 인증 상태 변화가 생기면 다시 쿠키를 업데이트하는 래퍼
export async function SupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set({ name, value, ...options }),
            );
          } catch (error) {
            if (process.env.NODE_ENV === "development") {
              console.warn(
                "Cookie setting attempted in read-only context:",
                error,
              );
            }
          }
        },
      },
    },
  );
}
