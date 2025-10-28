"use client";

import { Card, CardContent } from "@/shared/shadcn/ui/card";
import dayjs from "dayjs";
import Link from "next/link";
import { useMyComments } from "./hooks/use-my-comments";

export default function MyComments() {
  const { data: comments, isLoading, error } = useMyComments();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">내가 작성한 댓글</h2>

      <div className="grid gap-4">
        {comments?.map((comment) => (
          <Card key={comment.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <Link
                  href={`/board/${comment.post_category || "latest"}/${comment.post_id}`}
                  className="font-semibold text-lg hover:text-blue-600"
                >
                  {comment.post_title}
                </Link>
                <span className="text-sm text-gray-500">
                  {dayjs(comment.created_at).format("YYYY-MM-DD")}
                </span>
              </div>
              <p className="text-gray-600">{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
