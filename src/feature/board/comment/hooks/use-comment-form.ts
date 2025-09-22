import { useAuthState } from "@/app/providers/auth-client-provider";
import type { CommentCreate } from "@/entities/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { createFormSchema } from "../form/schema/comment-form-schema";

interface UseCommentFormProps {
  postId: string;
  refetch: () => void;
}

async function createCommentApi(data: CommentCreate) {
  const response = await fetch("/api/comment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("댓글 작성에 실패했습니다.");
  }
  return response.json();
}

export function useCommentForm({ postId, refetch }: UseCommentFormProps) {
  const { status, profile } = useAuthState();
  const isAuthed = status === "authed";

  const form = useForm({
    resolver: zodResolver(createFormSchema(isAuthed)),
    defaultValues: {
      content: "",
      nickname: profile?.nickname ?? "",
      password: "",
    },
  });

  const createCommentMutation = useMutation({
    mutationFn: createCommentApi,
    onSuccess: () => {
      form.reset();
      refetch();
    },
    onError: (error) => {
      console.error("댓글 작성 오류:", error);
      alert("댓글 작성에 실패했습니다.");
    },
  });

  const onSubmit = (data: any) => {
    const commentData: CommentCreate = {
      post_id: Number(postId),
      nickname: data.nickname,
      content: data.content,
      password: isAuthed ? null : data.password,
      author_id: isAuthed ? profile?.id : null,
      is_guest: !isAuthed,
      depth: 0,
    };

    createCommentMutation.mutate(commentData);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !createCommentMutation.isPending) {
      e.preventDefault();
      form.handleSubmit(onSubmit)();
    }
  };

  return {
    form,
    isAuthed,
    profile,
    createCommentMutation,
    onSubmit,
    handleKeyDown,
  };
}
