"use client";

import type { Post } from "@/entities/post";
import { useQuery } from "@tanstack/react-query";

interface MyPostsResponse {
  posts: Post[];
}

async function fetchMyPosts(): Promise<MyPostsResponse> {
  const response = await fetch("/api/user/posts");
  if (!response.ok) {
    throw new Error("내 게시글을 불러올 수 없습니다.");
  }
  return response.json();
}

export function useMyPosts() {
  return useQuery({
    queryKey: ["myPosts"],
    queryFn: fetchMyPosts,
    select: (data: MyPostsResponse) => data.posts,
  });
}
