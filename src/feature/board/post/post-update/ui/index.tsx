"use client";

import type { Profile } from "@/entities/profile";
import type { Tables } from "@/shared/types";
import { extractFirstImageUrl } from "@/shared/ui/markdown";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { type BoardFormType } from "../../../common/schema/board-schema";
import PostForm from "../../post-form";
import { useUpdateBoardPost } from "../hook/use-update-post";

interface Props {
  initialData: Tables<"posts">;
  profile?: Profile | null;
  category: string;
}

export default function PostUpdateWidget({
  initialData,
  profile,
  category,
}: Props) {
  const searchParams = useSearchParams();
  const verifiedPassword = searchParams?.get("verifiedPassword");
  const nickname = searchParams?.get("nickname");

  const form = useForm<BoardFormType>({
    defaultValues: {
      title: initialData.title || "",
      content: (initialData.content as string) || "",
      thumbnail: initialData.thumbnail || undefined,
      summary: initialData.summary || undefined,
      category: category,
      nickname: initialData.nickname || nickname || profile?.nickname || "", // 원본 글의 닉네임 우선 사용
      password: verifiedPassword || "", // 검증된 비밀번호 사용
    },
  });

  const { isSubmittingPost, onSubmit } = useUpdateBoardPost({
    category,
    editedPost: initialData,
  });

  // 폼 제출 시 content에서 첫 번째 이미지를 추출해 thumbnail에 할당
  const handleSubmit = (data: BoardFormType) => {
    const firstImage = extractFirstImageUrl(data.content);
    onSubmit({ ...data, thumbnail: firstImage });
  };

  // form이 초기화되지 않은 경우 처리
  if (!form) {
    return <div>Loading...</div>;
  }

  return (
    <PostForm
      form={form}
      isSubmitting={isSubmittingPost}
      onSubmit={handleSubmit}
      profile={profile}
    />
  );
}
