// lib/hooks/use-post-actions.ts
"use client";

import { useToast } from "@/shared/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ActionMode = "edit" | "delete" | null;

interface Post {
  postId: string;
  category: string;
  nickname?: string;
}

interface Options {
  post?: Post;
}

interface ModalState {
  open: boolean;
  loading: boolean;
  error?: string | null;
}

interface Return {
  /* 상태 */
  action: ActionMode;
  passwordModal: ModalState;
  confirmModal: { open: boolean; loading: boolean };

  /* UI 트리거 */
  openPasswordModal: (mode: Exclude<ActionMode, null>) => void;
  closePasswordModal: () => void;
  closeConfirmModal: () => void;

  /* 이벤트 핸들러 */
  verifyPassword: (password: string) => void;
  confirmDelete: () => void;
}

export const verifyPasswordApi = async (postId: string, password: string) => {
  const res = await fetch(`/api/post/${postId}/verify-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message || "비밀번호 검증 실패");
  }
  return password; // 호출부에서 password 그대로 쓰기 위해 반환
};

export const deletePostApi = async (postId: string, password: string) => {
  const res = await fetch(`/api/post/${postId}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "삭제 실패");
  }
  return res.json();
};

export function usePostActions({ post }: Options) {
  if (!post) {
    throw new Error("post is required");
  }

  const { postId, category, nickname } = post;
  const router = useRouter();
  const { toast } = useToast();

  /* 내부 상태 ------------------------------------------------------------- */
  const [action, setAction] = useState<ActionMode>(null);
  const [passwordModal, setPasswordModal] = useState<ModalState>({
    open: false,
    loading: false,
    error: null,
  });
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    loading: false,
  });
  const [tempPassword, setTempPassword] = useState<string>(""); // 삭제 시 임시 저장

  /* 비밀번호 검증 뮤테이션 ------------------------------------------------- */
  const verifyPasswordMutation = useMutation({
    mutationFn: (password: string) => verifyPasswordApi(postId, password),
    onSuccess: (_, password) => {
      setPasswordModal({ open: false, loading: false, error: null });

      if (action === "edit") {
        router.push(
          `/board/${category}/update/${postId}?verifiedPassword=${password}&nickname=${nickname}`,
        );
      } else if (action === "delete") {
        setTempPassword(password);
        setConfirmModal({ open: true, loading: false });
      }
    },
    onError: (err: Error) => {
      setPasswordModal((s) => ({ ...s, loading: false, error: err.message }));
    },
  });

  /* 게시글 삭제 뮤테이션 --------------------------------------------------- */
  const deletePostMutation = useMutation({
    mutationFn: () => deletePostApi(postId, tempPassword),
    onSuccess: () => {
      toast({ title: "삭제 완료", description: "게시글이 삭제되었습니다." });
      setConfirmModal({ open: false, loading: false });
      router.push(`/board/${category}`);
    },
    onError: (err: Error) => {
      toast({
        variant: "destructive",
        title: "삭제 실패",
        description: err.message,
      });
      setConfirmModal({ open: false, loading: false });
    },
  });

  /* 공개 핸들러 ----------------------------------------------------------- */
  const openPasswordModal = (mode: Exclude<ActionMode, null>) => {
    setAction(mode);
    setPasswordModal({ open: true, loading: false, error: null });
  };

  const closePasswordModal = () =>
    setPasswordModal({ open: false, loading: false, error: null });

  const closeConfirmModal = () =>
    setConfirmModal({ open: false, loading: false });

  const verifyPassword = async (password: string) => {
    setPasswordModal((s) => ({ ...s, loading: true }));
    await verifyPasswordMutation.mutate(password);
  };

  const confirmDelete = () => {
    if (!tempPassword) {
      toast({
        variant: "destructive",
        title: "삭제 실패",
        description: "비밀번호 정보가 없습니다.",
      });
      return;
    }
    setConfirmModal((s) => ({ ...s, loading: true }));
    deletePostMutation.mutate();
  };

  /* 반환 ------------------------------------------------------------------ */
  return {
    /* 상태 */
    action,
    passwordModal,
    confirmModal,

    /* UI 트리거 */
    openPasswordModal,
    closePasswordModal,
    closeConfirmModal,

    /* 핸들러 */
    verifyPassword,
    confirmDelete,
  };
}
