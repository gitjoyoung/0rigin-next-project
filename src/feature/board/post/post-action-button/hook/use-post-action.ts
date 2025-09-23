// lib/hooks/use-post-actions.ts
"use client";

import { useToast } from "@/shared/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import type { PostActionButtonsProps } from "..";

type ActionMode = "edit" | "delete" | null;

interface ModalState {
  open: boolean;
  loading: boolean;
  error?: string | null;
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

// 작성자/로그인 확인 API
export const checkPostAuthorApi = async (postId: string) => {
  const res = await fetch(`/api/post/${postId}/auth-check`);
  if (!res.ok) return { isAuthor: false, isLoggedIn: false };
  return res.json() as Promise<{ isAuthor: boolean; isLoggedIn: boolean }>;
};

type PostAccess = "author" | "guest";

// ---------------------------------------------------------------------------

export function usePostActions({ post }: PostActionButtonsProps) {
  if (!post) throw new Error("post is required");

  const { postId, category, nickname, author_id } = post;
  const router = useRouter();
  const { toast } = useToast();

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
  const clickBusyRef = useRef(false); // 다중 클릭 가드

  // ---------- Helpers ----------
  const openPasswordModal = () =>
    setPasswordModal({ open: true, loading: false, error: null });
  const closePasswordModal = () =>
    setPasswordModal({ open: false, loading: false, error: null });

  const openDeleteConfirm = () =>
    setConfirmModal({ open: true, loading: false });
  const closeConfirmModal = () =>
    setConfirmModal({ open: false, loading: false });

  const goEdit = (opts?: { verifiedPassword?: string }) => {
    // NOTE: 비번을 URL에 노출하는 게 민감하면 상태/세션으로 전달 고려
    const query = new URLSearchParams();
    if (opts?.verifiedPassword)
      query.set("verifiedPassword", opts.verifiedPassword);
    if (nickname) query.set("nickname", nickname);
    router.push(
      `/board/${category}/update/${postId}${query.toString() ? `?${query}` : ""}`,
    );
  };

  const toAccess = (flags: {
    isAuthor: boolean;
    isLoggedIn: boolean;
  }): PostAccess => (flags.isAuthor && flags.isLoggedIn ? "author" : "guest");

  // ---------- 선검증(작성자/로그인 여부) ----------
  const {
    data: access,
    isLoading: accessLoading,
    refetch: refetchAccess,
  } = useQuery({
    queryKey: ["postAccess", postId],
    // author_id가 없으면 바로 guest
    queryFn: async () => {
      if (!author_id) return "guest" as const;
      const flags = await checkPostAuthorApi(postId);
      return toAccess(flags);
    },
    staleTime: 60_000, // 1분 캐시
  });

  // ---------- 비밀번호 검증 ----------
  const verifyPasswordMutation = useMutation({
    mutationFn: (password: string) => verifyPasswordApi(postId, password),
    onSuccess: (password) => {
      closePasswordModal();

      if (action === "edit") {
        goEdit({ verifiedPassword: password });
        return;
      }
      if (action === "delete") {
        setTempPassword(password);
        openDeleteConfirm();
      }
    },
    onError: (err: Error) => {
      setPasswordModal((s) => ({ ...s, loading: false, error: err.message }));
    },
  });

  // ---------- 게시글 삭제 ----------
  const deletePostMutation = useMutation({
    mutationFn: () => deletePostApi(postId, tempPassword),
    onSuccess: () => {
      toast({ title: "삭제 완료", description: "게시글이 삭제되었습니다." });
      closeConfirmModal();
      router.push(`/board/${category}`);
    },
    onError: (err: Error) => {
      toast({
        variant: "destructive",
        title: "삭제 실패",
        description: err.message,
      });
      closeConfirmModal();
    },
  });

  // ---------- 공개 핸들러 ----------
  const handleEditDeleteState = async (mode: Exclude<ActionMode, null>) => {
    if (clickBusyRef.current) return;
    clickBusyRef.current = true;
    setAction(mode);

    try {
      // 선검증 로딩 중이면 한 번만 강제 갱신
      let currentAccess = access;
      if (accessLoading || currentAccess == null) {
        const result = await refetchAccess();
        currentAccess = result.data;
      }

      if (currentAccess === "author") {
        if (mode === "edit") {
          goEdit();
        } else {
          openDeleteConfirm();
        }
        return;
      }

      // guest 흐름: 비번 모달
      openPasswordModal();
    } catch (e) {
      // 예외 시 보수적으로 비번 모달로 유도
      openPasswordModal();
    } finally {
      clickBusyRef.current = false;
    }
  };

  const verifyPassword = async (password: string) => {
    setPasswordModal((s) => ({ ...s, loading: true }));
    await verifyPasswordMutation.mutateAsync(password);
  };

  const confirmDelete = async () => {
    setConfirmModal((s) => ({ ...s, loading: true }));
    await deletePostMutation.mutateAsync();
  };

  // ---------- 반환 ----------
  return {
    /* 상태 */
    action,
    passwordModal,
    confirmModal,

    /* UI 트리거 */
    handleEditDeleteState,
    closePasswordModal,
    closeConfirmModal,

    /* 핸들러 */
    verifyPassword,
    confirmDelete,
  };
}
