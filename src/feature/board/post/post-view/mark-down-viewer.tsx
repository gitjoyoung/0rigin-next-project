"use client";

import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

export default function MarkDownViewer({ content }: Props) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // 마운트 전에는 아무것도 렌더하지 않음(또는 스켈레톤)
  if (!mounted) {
    return <div className="markdown-preview" style={{ minHeight: 200 }} />;
  }

  return (
    <div
      suppressHydrationWarning
      key={resolvedTheme ?? theme ?? "light"}
      data-color-mode={(resolvedTheme ?? theme) === "dark" ? "dark" : "light"}
    >
      <MarkdownPreview
        source={content}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[[rehypeSanitize], [rehypeHighlight]]}
        className="markdown-preview"
        style={{
          minHeight: 200,
          backgroundColor: "transparent",
          color: "inherit",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}
