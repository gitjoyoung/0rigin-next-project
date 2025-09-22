"use client";

import CommentHeader from "./common/comment-header";
import CommentList from "./common/comment-list";
import CommentForm from "./form";
import { useComments } from "./hooks/use-comments";

interface Props {
  postId: string;
}

export default function Comment({ postId }: Props) {
  const { commentsData, refetch } = useComments(postId);

  return (
    <div className="my-2">
      <CommentHeader commentCount={commentsData.length} refetch={refetch} />
      <CommentList commentsData={commentsData} refetch={refetch} />
      <CommentForm postId={postId} refetch={refetch} />
    </div>
  );
}
