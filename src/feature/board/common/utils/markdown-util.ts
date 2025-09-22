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
