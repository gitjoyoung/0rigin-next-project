"use client";

import { cn } from "@/shared/utils/cn";
import { useEffect, useState } from "react";
import type { TocHeading } from "./markdown-utils";

interface TableOfContentsProps {
  headings: TocHeading[];
  className?: string;
}

const LEVEL_INDENT_MAP = {
  1: "pl-0 font-bold text-[13px]",
  2: "pl-2 text-[12px]",
  3: "pl-4 text-[8px]",
} as const;

export default function TableOfContents({
  headings,
  className,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  // 디버깅: 전달받은 headings 확인
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("[TOC] Received headings:", headings);
    }
  }, [headings]);

  // 초기 해시 진입 처리
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    // user-content- 접두사 제거
    const cleanHash = hash.replace(/^user-content-/, "");

    if (cleanHash && headings.some((h) => h.id === cleanHash)) {
      setActiveId(cleanHash);
    } else if (headings.length > 0) {
      // 해시가 없으면 첫 번째 헤딩을 active로
      setActiveId(headings[0].id);
    }
  }, [headings]);

  // Intersection Observer로 active 헤딩 추적
  useEffect(() => {
    if (headings.length === 0) return;

    const visibleHeadings = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleHeadings.add(entry.target.id);
          } else {
            visibleHeadings.delete(entry.target.id);
          }
        });

        // 화면 상단에 가장 가까운 헤딩 선택
        if (visibleHeadings.size > 0) {
          const visibleElements = Array.from(visibleHeadings)
            .map((id) => document.getElementById(id))
            .filter((el): el is HTMLElement => el !== null)
            .sort((a, b) => {
              // 화면 상단(0)에서의 거리로 정렬
              const aTop = Math.abs(a.getBoundingClientRect().top);
              const bTop = Math.abs(b.getBoundingClientRect().top);
              return aTop - bTop;
            });

          if (visibleElements[0]) {
            // user-content- 접두사 제거하여 저장
            const cleanId = visibleElements[0].id.replace(/^user-content-/, "");
            setActiveId(cleanId);
          }
        }
      },
      {
        // 상단 80px(헤더), 하단 50% 지점을 기준으로 관찰
        rootMargin: "-80px 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    // 모든 헤딩 요소 관찰 (user-content- 접두사 추가)
    headings.forEach(({ id }) => {
      const element = document.getElementById(`user-content-${id}`);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      visibleHeadings.clear();
    };
  }, [headings]);

  const handleClick = (id: string) => {
    // user-content- 접두사 추가하여 요소 찾기
    const element = document.getElementById(`user-content-${id}`);

    if (!element) {
      console.warn(`[TOC] Element with id "user-content-${id}" not found`);
      console.log(
        "[TOC] Available heading IDs:",
        Array.from(document.querySelectorAll("h1[id], h2[id], h3[id]")).map(
          (el) => el.id,
        ),
      );
      return;
    }

    // prefers-reduced-motion 체크
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    // element.scrollIntoView 사용 (CSS scroll-margin-top 자동 적용)
    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });

    // URL 업데이트 (user-content- 접두사 포함)
    history.replaceState(null, "", `#user-content-${id}`);

    // 즉시 active 상태 업데이트 (접두사 없이)
    setActiveId(id);
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className={cn("w-64 shrink-0", className)} aria-label="목차">
      <div className="space-y-1 py-4">
        <ul className="space-y-2 ">
          {headings.map((heading) => {
            const isActive = activeId === heading.id;
            return (
              <li key={heading.id} className={LEVEL_INDENT_MAP[heading.level]}>
                <button
                  onClick={() => handleClick(heading.id)}
                  className={cn(
                    "text-left w-full py-1 px-2 rounded transition-colors duration-200",
                    "hover:bg-accent hover:text-accent-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    isActive
                      ? "text-primary font-medium bg-accent/50"
                      : "text-muted-foreground",
                  )}
                  aria-current={isActive ? "location" : undefined}
                >
                  <span className="line-clamp-2">{heading.text}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
