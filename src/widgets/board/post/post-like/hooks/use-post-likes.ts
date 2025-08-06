"use client";

import { useAuthState } from "@/app/providers/auth-client-provider";
import { useAnonSession } from "@/shared/hooks/use-anon-session";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type PostLikeData = {
  count: number;
  hasLiked: boolean;
};

// API 함수 분리
const getPostLikeCount = async (
  postId: string,
  userKey: string,
): Promise<PostLikeData> => {
  const res = await fetch(`/api/post/${postId}/like?userKey=${userKey}`, {
    method: "GET",
    credentials: "include",
  });
  const { count, hasLiked } = await res.json();
  return { count, hasLiked };
};

const updatePostLike = async (
  postId: string,
  anonKey: string,
  isAuthenticated: boolean,
): Promise<PostLikeData> => {
  const body = JSON.stringify({
    anonKey,
    isAuthenticated,
  });

  const res = await fetch(`/api/post/${postId}/like`, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // 쿠키 포함
  });
  return res.json();
};

type UsePostLikesResult = {
  likesCount: number;
  isLoading: boolean;
  isPending: boolean;
  toggleLike: () => void;
  hasLiked: boolean;
};

export function usePostLikes(postId: string): UsePostLikesResult {
  const { anonKey } = useAnonSession();
  const queryClient = useQueryClient();

  const { user } = useAuthState();
  const userId = user?.id;
  const isAuthenticated = !!userId;
  const userKey = userId || anonKey;

  const { data, isLoading } = useQuery<PostLikeData>({
    queryKey: ["postLikeData", postId],
    queryFn: () => getPostLikeCount(postId, userKey),
  });

  const { mutate: fetchPostLike, isPending } = useMutation({
    mutationFn: () => updatePostLike(postId, userKey, isAuthenticated),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["postLikeData", postId] });
      const previousData = queryClient.getQueryData<PostLikeData>([
        "postLikeData",
        postId,
      ]);

      queryClient.setQueryData<PostLikeData>(
        ["postLikeData", postId],
        (old) => {
          if (!old) return old;
          return {
            count: old.hasLiked ? old.count - 1 : old.count + 1,
            hasLiked: !old.hasLiked,
          };
        },
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["postLikeData", postId],
          context.previousData,
        );
      }
    },
    onSettled: () => {
      // 성공/실패 관계없이 최신 데이터로 동기화
      queryClient.invalidateQueries({ queryKey: ["postLikeData", postId] });
    },
  });

  const toggleLike = () => {
    if (!isPending && userKey) fetchPostLike();
  };

  return {
    likesCount: data?.count ?? 0,
    isLoading,
    isPending,
    toggleLike,
    hasLiked: data?.hasLiked ?? false,
  };
}
