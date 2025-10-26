"use client";

import type { Database } from "@/shared/types";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { forwardRef, useEffect } from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { generateHeadingId } from "./markdown-utils";

interface Props {
  content: Database["public"]["Tables"]["posts"]["Row"]["content"];
}

// React children에서 텍스트 재귀적으로 추출
function extractTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractTextFromChildren).join("");
  }

  if (children && typeof children === "object" && "props" in children) {
    return extractTextFromChildren((children as any).props.children);
  }

  return "";
}

// ID 중복 방지를 위한 카운터
const headingCounters = new Map<string, number>();

// 커스텀 헤딩 컴포넌트 생성 함수
function createHeadingComponent(level: 1 | 2 | 3) {
  return function HeadingComponent({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) {
    const text = extractTextFromChildren(children);
    let id: string | undefined;

    if (text) {
      const baseId = generateHeadingId(text);
      const count = headingCounters.get(baseId) || 0;
      headingCounters.set(baseId, count + 1);

      // 첫 번째는 suffix 없이, 두 번째부터는 -2, -3, ... 추가
      id = count === 0 ? baseId : `${baseId}-${count + 1}`;

      // 디버깅: ID 생성 로그
      if (process.env.NODE_ENV === "development") {
        console.log(`[Heading ${level}] Text: "${text}" → ID: "${id}"`);
      }
    }

    const Tag = `h${level}` as const;

    return (
      <Tag
        id={id}
        {...props}
        style={{ scrollMarginTop: "80px", ...props.style }}
      >
        {children}
      </Tag>
    );
  };
}

// 순수한 렌더링 컴포넌트: ref를 받아서 content만 렌더링
const MarkDownViewer = forwardRef<HTMLDivElement, Props>(({ content }, ref) => {
  // 컨텐츠 변경 시 카운터 초기화
  useEffect(() => {
    headingCounters.clear();
  }, [content]);

  return (
    <div ref={ref} suppressHydrationWarning className="prose max-w-none ">
      <MarkdownPreview
        source={content as unknown as string}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[[rehypeSanitize], [rehypeHighlight]]}
        components={{
          h1: createHeadingComponent(1),
          h2: createHeadingComponent(2),
          h3: createHeadingComponent(3),
        }}
        style={{ backgroundColor: "transparent", color: "inherit" }}
      />
    </div>
  );
});

MarkDownViewer.displayName = "MarkDownViewer";

export default MarkDownViewer;
