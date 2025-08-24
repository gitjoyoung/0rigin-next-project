import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (!code)
    return NextResponse.redirect(`${origin}/auth/error?reason=no_code`);

  const supabase = await SupabaseServerClient();
  const { error: exErr } = await supabase.auth.exchangeCodeForSession(code);
  if (exErr) return new NextResponse(null, { status: 400 });

  const {
    data: { user },
    error: userErr,
  } = await supabase.auth.getUser();
  if (userErr || !user) {
    await supabase.auth.signOut();
    return new NextResponse(null, { status: 400 });
  }

  const { data: profileRow, error: profileErr } = await supabase
    .from("profile")
    .select("id, signup_complete")
    .eq("id", user.id)
    .maybeSingle();

  // 프로필 조회 성공 시 홈페이지로, 실패 시 프로필 완성 페이지로 이동
  if (!profileErr && profileRow && profileRow.signup_complete === true) {
    // 프로필 조회 성공 - 홈페이지로 리다이렉트
    return NextResponse.redirect(`${origin}${next}`);
  } else {
    // 프로필 조회 실패 또는 프로필 불완전 - 세션 정리 후 프로필 완성 페이지로 이동
    await supabase.auth.signOut();

    const completeProfileParams = new URLSearchParams({
      userId: user.id,
      email: user.email || "",
    });

    return NextResponse.redirect(
      `${origin}/sign/complete-profile?${completeProfileParams.toString()}`,
    );
  }
}
