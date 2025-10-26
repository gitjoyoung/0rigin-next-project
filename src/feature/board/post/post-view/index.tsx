"use client";

import { Separator } from "@/shared/shadcn/ui/separator";
import type { Database } from "@/shared/types";
import {
  MarkdownViewer,
  TableOfContents,
  useHeadings,
} from "@/shared/ui/markdown";
import { useRef } from "react";
import PostHeader from "./ui/post-header";

interface Props {
  postData: Database["public"]["Tables"]["posts"]["Row"];
  likeCount: number;
}

export default function PostView({ postData, likeCount }: Props) {
  const { content, ...rest } = postData;

  // 마크다운 컨테이너 ref
  const markdownRef = useRef<HTMLDivElement>(null);

  // 커스텀 훅으로 헤딩 추출 (순수한 데이터 추출 로직)
  const headings = useHeadings(markdownRef, content as string);

  return (
    <section className="flex flex-col gap-3">
      <PostHeader {...rest} likeCount={likeCount} />

      {/* 콘텐츠와 TOC 레이아웃 조립 */}
      <section className="flex gap-4 relative w-full items-stretch">
        {/* 메인 콘텐츠 */}
        <div className="flex-1 min-w-0">
          <MarkdownViewer ref={markdownRef} content={postData.content} />
        </div>

        {/* 구분선 - 최소 공간 차지 */}
        <Separator
          orientation="vertical"
          className="hidden lg:block w-px shrink-0"
        />

        {/* TOC 사이드바 - 포지셔닝 및 반응형 제어 */}
        <div className="hidden lg:block sticky top-20 h-fit max-h-[calc(100vh-6rem)] overflow-y-auto">
          <TableOfContents headings={headings} />
        </div>
      </section>
    </section>
  );
}
