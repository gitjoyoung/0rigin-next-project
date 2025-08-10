import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/";

    if (!code) {
      return NextResponse.json(
        { error: "인증 코드가 없습니다." },
        { status: 400 },
      );
    }

    const supabase = await SupabaseServerClient();

    // OAuth 코드를 세션으로 교환
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("OAuth callback error:", error);
      return NextResponse.redirect(`${origin}/login?error=oauth_failed`);
    }

    // 성공 시 지정된 경로로 리디렉션
    return NextResponse.redirect(`${origin}${next}`);
  } catch (error) {
    console.error("OAuth callback processing error:", error);
    return NextResponse.redirect(
      `${request.nextUrl.origin}/login?error=oauth_failed`,
    );
  }
}
