"use client";

import { usePostLikes } from "./hooks/use-post-likes";
import LikeButton from "./ui/like-button";

interface Props {
  postId: string;
}

export default function PostLike({ postId }: Props) {
  const { likesCount, toggleLike, isLoading, isPending, hasLiked } =
    usePostLikes(postId);
  return (
    <LikeButton
      likesCount={likesCount ?? 0}
      toggleLike={toggleLike}
      isLoading={isLoading}
      isPending={isPending}
      hasLiked={hasLiked}
    />
  );
}
