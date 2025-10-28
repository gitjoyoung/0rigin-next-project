"use client";

import { useQuery } from "@tanstack/react-query";

interface MyCommentsResponse {
  comments: Array<{
    id: number;
    content: string;
    created_at: string;
    post_id: number;
    post_title: string;
    post_category: string | null;
  }>;
}

async function fetchMyComments(): Promise<MyCommentsResponse> {
  const response = await fetch("/api/user/comments");
  if (!response.ok) {
    throw new Error("내 댓글을 불러올 수 없습니다.");
  }
  return response.json();
}

export function useMyComments() {
  return useQuery({
    queryKey: ["myComments"],
    queryFn: fetchMyComments,
    select: (data: MyCommentsResponse) => data.comments,
  });
}
