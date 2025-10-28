// middleware.ts
import { ROUTE_LOGIN } from "@/constants/pathname";
import {
  AUTH_FORBIDDEN_PATHS,
  PROTECTED_PREFIXES,
} from "@/shared/constants/protected-routes";
import { updateSession } from "@/shared/lib/supabase/supabase-session";
import { NextRequest, NextResponse, userAgent } from "next/server";

const isProd = process.env.NODE_ENV === "production";
const isSecure = isProd || process.env.FORCE_HTTPS === "true";

function isProtected(pathname: string) {
  // 예: ['/dashboard', '/account'] 같은 prefix만 관리
  return PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(p + "/"),
  );
}

function isAuthForbidden(pathname: string) {
  // 예: ['/login', '/sign', '/reset/password']
  return AUTH_FORBIDDEN_PATHS.has(pathname);
}

function getViewport(req: NextRequest): "mobile" | "tablet" | "desktop" {
  const { device } = userAgent(req);
  if (device.type === "mobile") return "mobile";
  if (device.type === "tablet") return "tablet";
  return "desktop";
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const needsAuth = isProtected(pathname);
  let user: any = null;
  let res = NextResponse.next();

  // 보호 라우트 또는 금지 라우트일 때만 세션 동기화
  if (needsAuth || isAuthForbidden(pathname)) {
    try {
      const session = await updateSession(req);
      res = session.supabaseResponse; // 쿠키 동기화
      user = session.user;
    } catch (e) {
      if (!isProd) console.warn("updateSession failed:", e);
    }
  }

  // 인증 가드
  if (needsAuth && !user) {
    return NextResponse.redirect(new URL(ROUTE_LOGIN, req.url));
  }
  if (user && isAuthForbidden(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // URL 변형(rewrite) 대신 헤더로 전달 → 캐싱/링크 안정성↑
  res.headers.set("x-viewport", getViewport(req));

  // 방문자 로깅은 비동기 API로 위임 (실패해도 무시)
  queueVisitorLog(req, res).catch(() => {});

  return res;
}

async function queueVisitorLog(req: NextRequest, res: NextResponse) {
  const ua = req.headers.get("user-agent") || "";
  if (/bot|crawl|spider|healthcheck/i.test(ua)) return;

  let visitorId = req.cookies.get("visitor_id")?.value;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    res.cookies.set("visitor_id", visitorId, {
      httpOnly: true,
      secure: isSecure,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
      path: "/",
    });
  }
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), 120);
  try {
    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/visitors`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ vid: visitorId, path: req.nextUrl.pathname }),
      signal: ac.signal,
      keepalive: true,
    });
  } finally {
    clearTimeout(t);
  }
}

export const config = {
  matcher: [
    // 정적/이미지/API 제외
    "/((?!_next/static|_next/image|favicon.ico|api|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
