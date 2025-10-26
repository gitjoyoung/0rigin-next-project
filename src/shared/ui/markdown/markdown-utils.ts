"use client";
import removeMd from "remove-markdown";

// 마크다운에서 첫 번째 이미지 URL 추출 함수
export function extractFirstImageUrl(markdown: string): string {
  const imageRegex = /!\[[^\]]*\]\(([^)]+)\)/;
  const match = imageRegex.exec(markdown);
  return match ? match[1] : "";
}

export function removeImagesAndMarkdown(
  markdown: string | undefined | null,
): string {
  if (!markdown) return "";
  const noImages = markdown.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  return removeMd(noImages).replace(/\n+/g, " ").trim();
}

// TOC 관련 타입 정의
export interface TocHeading {
  id: string;
  text: string;
  level: 1 | 2 | 3;
}

// 문자열을 URL 친화적인 ID로 변환
export function generateHeadingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s가-힣ㄱ-ㅎㅏ-ㅣ-]/g, "") // 특수문자 제거 (한글 포함)
    .replace(/\s+/g, "-") // 공백을 하이픈으로
    .trim();
}
