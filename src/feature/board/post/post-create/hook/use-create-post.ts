"use client";

import type { Post, PostCreate } from "@/entities/post/types";
import type { Profile } from "@/entities/profile";
import { useToast } from "@/shared/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type BoardFormType } from "../../../common/schema/board-schema";
import { removeImagesAndMarkdown } from "../../../common/utils/markdown-util";

async function createPostApi(data: PostCreate): Promise<Post> {
  const response = await fetch("/api/post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("게시글 생성에 실패했습니다.");
  }
  return response.json();
}

export function useCreateBoardPost({
  category,
  profile,
}: {
  category: string;
  profile: Profile | null;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: async (data: BoardFormType) => {
      const summary = removeImagesAndMarkdown(data.content);
      const postData: PostCreate = {
        title: data.title,
        content: data.content,
        summary,
        thumbnail: data.thumbnail,
        category: data.category || category,
        nickname: data.nickname,
        password: data.password ?? undefined,
        author_id: profile?.id ?? undefined,
      };
      return await createPostApi(postData);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["posts-create"] });
      router.push(`/board/${data.category || category}/${data.id}`);
      toast({
        title: "성공",
        description: "게시글이 성공적으로 작성되었습니다.",
        duration: 3000,
      });
    },
    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: "오류",
        description: `글쓰기 오류: ${error.message}`,
        duration: 3000,
      });
    },
  });

  // 폼 제출 핸들러만 외부로 노출
  const onSubmit = (data: BoardFormType) => {
    mutation.mutate(data);
  };

  return {
    isSubmitting: mutation.isPending,
    onSubmit,
  };
}
