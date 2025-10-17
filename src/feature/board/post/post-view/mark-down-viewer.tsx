"use client";

import type { Database } from "@/shared/types";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import rehypeHighlight from "rehype-highlight";
import rehypeSanitize from "rehype-sanitize";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

interface Props {
  content: Database["public"]["Tables"]["posts"]["Row"]["content"];
}

export default function MarkDownViewer({ content }: Props) {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted)
    return (
      <div className="prose dark:prose-invert" style={{ minHeight: 200 }} />
    );

  const isDark = (resolvedTheme ?? theme) === "dark";

  return (
    <div
      suppressHydrationWarning
      key={resolvedTheme ?? theme ?? "light"} // 테마 변경 시 강제 리렌더
      data-color-mode={isDark ? "dark" : "light"}
      className="prose max-w-none dark:prose-invert "
    >
      <MarkdownPreview
        source={content as unknown as string}
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[[rehypeSanitize], [rehypeHighlight]]}
        style={{
          backgroundColor: "transparent",
          color: "inherit",
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}
