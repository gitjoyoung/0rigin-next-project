import { useEffect, useState } from "react";
import type { TocHeading } from "./markdown-utils";

/**
 * 렌더링된 DOM에서 실제 헤딩 요소를 추출하는 Hook
 * 마크다운 파싱보다 훨씬 간단하고 정확함
 *
 * @param containerRef - 마크다운이 렌더링된 컨테이너의 ref
 * @param content - 마크다운 콘텐츠 (변경 감지용)
 * @returns 추출된 헤딩 배열
 */
export function useHeadings(
  containerRef: React.RefObject<HTMLElement | null>,
  content: string,
) {
  const [headings, setHeadings] = useState<TocHeading[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // DOM이 완전히 렌더링될 때까지 약간의 딜레이
    const timer = setTimeout(() => {
      if (!containerRef.current) return;

      // DOM에서 h1, h2, h3 요소 직접 추출
      const headingElements = containerRef.current.querySelectorAll(
        "h1[id], h2[id], h3[id]",
      );

      const extractedHeadings: TocHeading[] = Array.from(headingElements).map(
        (element) => {
          const tagName = element.tagName.toLowerCase();
          const level = parseInt(tagName[1]) as 1 | 2 | 3;

          // user-content- 접두사 제거
          const id = element.id.replace(/^user-content-/, "");

          // 실제 렌더링된 텍스트 (이미 정리된 상태)
          const text = element.textContent || "";

          return { id, text, level };
        },
      );

      setHeadings(extractedHeadings);
    }, 100);

    return () => clearTimeout(timer);
  }, [containerRef, content]);

  return headings;
}
