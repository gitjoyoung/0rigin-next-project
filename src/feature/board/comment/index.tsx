"use client";

import CommentForm from "./form";
import { useComments } from "./hooks/use-comments";
import CommentHeader from "./ui/comment-header";
import CommentList from "./ui/comment-list";

interface Props {
  postId: string;
}

export default function Comment({ postId }: Props) {
  const { commentsData, refetch, isFetching } = useComments(postId);

  return (
    <div className="my-2">
      <CommentHeader
        commentCount={commentsData.length}
        refetch={refetch}
        isFetching={isFetching}
      />
      <CommentList commentsData={commentsData} refetch={refetch} />
      <CommentForm postId={postId} refetch={refetch} />
    </div>
  );
}
