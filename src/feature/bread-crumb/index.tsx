"use client";

import { toast } from "@/shared/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/shadcn/ui/breadcrumb";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function BreadcrumbWidget() {
  const [pathname, setPathname] = useState("");

  useEffect(() => {
    setPathname(window.location.pathname);
    const handleRouteChange = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handleRouteChange);
    return () => window.removeEventListener("popstate", handleRouteChange);
  }, []);

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
      : segment.charAt(0).toUpperCase() + segment.slice(1);

    return {
      segment,
      href,
      displayName,
      isLast,
    };
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      className: "bg-green-400",
      variant: "default",
      title: "링크가 복사되었습니다.",
    });
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/board">Board</Link>
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
        <Button
          className="ml-auto"
          variant="outline"
          size="sm"
          onClick={handleCopyLink}
        >
          링크 복사
        </Button>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
