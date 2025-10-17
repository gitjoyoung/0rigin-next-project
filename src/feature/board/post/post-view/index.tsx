"use client";

import type { Database } from "@/shared/types";
import { useEffect } from "react";
import MarkDownViewer from "./mark-down-viewer";
import PostHeader from "./post-header";

interface Props {
  postData: Database["public"]["Tables"]["posts"]["Row"];
  likeCount: number;
}

export default function PostView({ postData, likeCount }: Props) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [postData.id]);

  const { content, ...rest } = postData;
  return (
    <section className="flex flex-col gap-3 ">
      <PostHeader {...rest} likeCount={likeCount} />
      <MarkDownViewer content={postData.content} />
    </section>
  );
}
