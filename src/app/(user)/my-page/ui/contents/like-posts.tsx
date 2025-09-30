"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  likes: number;
  comments: number;
}

export default function LikedPosts() {
  // 임시 데이터
  const posts: Post[] = [
    {
      id: "1",
      title: "좋아요한 게시글",
      content: "게시글 내용입니다...",
      author: "작성자",
      createdAt: "2024-03-20",
      likes: 5,
      comments: 3,
    },
    // 더 많은 임시 데이터...
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">좋아요한 글</h2>
      <div className="grid gap-4">
        {posts.map((post) => (
          <Card key={post.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-xl">{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500">
                  작성자: {post.author}
                </span>
                <span className="text-sm text-gray-500">{post.createdAt}</span>
              </div>
              <p className="text-gray-600 mb-2">{post.content}</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>좋아요 {post.likes}</span>
                <span>댓글 {post.comments}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
