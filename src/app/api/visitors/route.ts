// app/api/visitors/route.ts
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { NextRequest, NextResponse, userAgent } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { vid: visitorId, path: pagePath } = await req.json();
    if (!visitorId || !pagePath)
      return NextResponse.json({ ok: false }, { status: 400 });

    // IP 최소화: 첫번째 X-Forwarded-For만 저장(또는 완전 비활성화)
    const forwardedFor = req.headers.get("x-forwarded-for") || "";
    const clientIp = forwardedFor.split(",")[0]?.trim() || null;

    const { browser, device, os } = userAgent(req);
    const acceptLanguage =
      req.headers.get("accept-language")?.split(",")[0] ?? null;
    const referrer = req.headers.get("referer") ?? null;

    const supabase = await SupabaseServerClient();

    // 현재 로그인 사용자 확인 (익명이면 null)
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError && process.env.NODE_ENV === "development") {
      console.warn("Failed to get user in visitors API:", authError);
    }

    await supabase.from("visitors").insert({
      visitor_id: visitorId,
      page_url: pagePath,
      ip_address: clientIp, // 필요 없으면 컬럼 자체 제거 권장
      device_type: device.type ?? null,
      browser: browser.name ?? null,
      os: os.name ?? null,
      language: acceptLanguage,
      referrer,
      user_id: user?.id ?? null, // 로그인 사용자 ID (익명이면 null)
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    // 개발 환경에서는 디버깅을 위해 로그 출력
    if (process.env.NODE_ENV === "development") {
      console.error("Visitor logging failed:", error);
    }
    // 로깅 실패는 조용히 처리 (사용자 경험에 영향 없음)
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}
