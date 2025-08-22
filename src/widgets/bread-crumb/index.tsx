"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/shadcn/ui/breadcrumb";
import Link from "next/link";
import { useEffect, useState } from "react";

// 경로명을 한국어로 변환하는 매핑 객체
const pathNameMap: Record<string, string> = {
  board: "게시판",
  philosophy: "철학",
  components: "컴포넌트",
  // 필요한 경로명들을 추가하세요
};

export default function BreadcrumbWidget() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);

    // 경로 변경 감지를 위한 이벤트 리스너
    const handleRouteChange = () => {
      setPathname(window.location.pathname);
    };

    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

  // board로 시작하지 않는 경로면 breadcrumb을 표시하지 않음
  if (!pathname.startsWith("/board")) {
    return null;
  }

  // 경로를 세그먼트로 분할 (빈 문자열 제거)
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  // board를 제외한 나머지 세그먼트들만 breadcrumb 항목으로 생성
  const boardIndex = pathSegments.indexOf("board");
  const remainingSegments = pathSegments.slice(boardIndex + 1);

  // breadcrumb 항목들 생성 (board 이후 경로들만)
  const breadcrumbItems = remainingSegments.map((segment, index) => {
    const href = "/board/" + remainingSegments.slice(0, index + 1).join("/");
    const isLast = index === remainingSegments.length - 1;

    // 숫자인 경우 (게시글 ID 등) 그대로 표시, 아니면 매핑된 이름 사용
    const displayName = /^\d+$/.test(segment)
      ? segment
      : pathNameMap[segment] ||
        segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      segment,
      href,
      displayName,
      isLast,
    };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/board">게시판</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {breadcrumbItems.flatMap((item, index) => [
          <BreadcrumbSeparator
            key={`separator-${item.segment}-${index}`}
            className="flex items-center "
          >
            <span className="text-muted-foreground">/</span>
          </BreadcrumbSeparator>,
          <BreadcrumbItem key={`item-${item.segment}-${index}`}>
            {item.isLast ? (
              <BreadcrumbPage>{item.displayName}</BreadcrumbPage>
            ) : (
              <BreadcrumbLink asChild>
                <Link href={item.href}>{item.displayName}</Link>
              </BreadcrumbLink>
            )}
          </BreadcrumbItem>,
        ])}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
