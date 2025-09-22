import { useAuthState } from "@/app/providers/auth-client-provider";
import type { Comment } from "@/entities/comment";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

// 클라이언트에서 사용할 댓글 수정 함수
async function updateCommentApi(
  id: number,
  content: string,
  password?: string,
) {
  const response = await fetch(`/api/comment/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content, password }),
  });

  if (!response.ok) {
    let errorMessage = "댓글 수정에 실패했습니다.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // JSON 파싱 실패 시 기본 메시지 사용
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

async function deleteCommentApi(id: number, password?: string) {
  const response = await fetch(`/api/comment/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ password }),
  });

  if (!response.ok) {
    let errorMessage = "댓글 삭제에 실패했습니다.";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorMessage;
    } catch {
      // JSON 파싱 실패 시 기본 메시지 사용
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

export function useCommentItem({
  commentData,
  refetch,
  isSelected,
}: {
  commentData: Comment;
  refetch: () => void;
  isSelected?: number | null;
}) {
  const { user } = useAuthState();
  const [isEditing, setIsEditing] = useState(false);
  const [passwordModal, setPasswordModal] = useState<{
    action: "update" | "delete";
    error?: string;
  } | null>(null);
  const editContentRef = useRef<HTMLTextAreaElement>(null);

  // 수정 모드 시작 시 초기값 설정
  useEffect(() => {
    if (isEditing && editContentRef.current) {
      editContentRef.current.value = commentData.content;
    }
  }, [isEditing, commentData.content]);

  // 다른 댓글이 선택되었을 때 수정 모드 취소
  useEffect(() => {
    if (isSelected !== commentData.id && isEditing) {
      setIsEditing(false);
      setPasswordModal(null);
    }
  }, [isSelected, commentData.id, isEditing]);

  const updateMutation = useMutation({
    mutationFn: ({
      id,
      content,
      password,
    }: {
      id: number;
      content: string;
      password?: string;
    }) => updateCommentApi(id, content, password),
    onSuccess: () => {
      setIsEditing(false);
      setPasswordModal(null);
      refetch();
      alert("댓글이 수정되었습니다.");
    },
    onError: (error) => {
      setPasswordModal((prev) =>
        prev ? { ...prev, error: error.message } : null,
      );
      alert(`수정 실패: ${error.message}`);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: ({ id, password }: { id: number; password?: string }) =>
      deleteCommentApi(id, password),
    onSuccess: () => {
      setPasswordModal(null);
      refetch();
      alert("댓글이 삭제되었습니다.");
    },
    onError: (error) => {
      setPasswordModal((prev) =>
        prev ? { ...prev, error: error.message } : null,
      );
      alert(`삭제 실패: ${error.message}`);
    },
  });

  // 권한 검증 함수
  const checkPermission = (action: "update" | "delete") => {
    if (commentData.author_id) {
      if (user?.id === commentData.author_id) {
        return { hasPermission: true, needPassword: false };
      } else {
        alert(
          `본인의 댓글만 ${action === "update" ? "수정" : "삭제"}할 수 있습니다.`,
        );
        return { hasPermission: false, needPassword: false };
      }
    }
    return { hasPermission: true, needPassword: true };
  };

  const handleUpdate = async () => {
    const { hasPermission, needPassword } = checkPermission("update");

    if (!hasPermission) return;

    if (needPassword) {
      setPasswordModal({ action: "update" });
    } else {
      const content = editContentRef.current?.value || "";
      updateMutation.mutate({
        id: commentData.id,
        content,
      });
    }
  };

  const handleDelete = async () => {
    const { hasPermission, needPassword } = checkPermission("delete");

    if (!hasPermission) return;

    if (needPassword) {
      setPasswordModal({ action: "delete" });
    } else {
      if (confirm("댓글을 삭제하시겠습니까?")) {
        deleteMutation.mutate({
          id: commentData.id,
        });
      }
    }
  };

  const handlePasswordConfirm = async (password: string) => {
    if (!passwordModal) return;

    if (passwordModal.action === "update") {
      const content = editContentRef.current?.value || "";
      updateMutation.mutate({
        id: commentData.id,
        content,
        password,
      });
    } else if (passwordModal.action === "delete") {
      deleteMutation.mutate({
        id: commentData.id,
        password,
      });
    }
  };

  return {
    // 상태
    isEditing,
    setIsEditing,
    editContentRef,

    // 핸들러
    handleUpdate,
    handleDelete,
    handlePasswordConfirm,

    // 로딩 상태
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // 비밀번호 모달
    showPasswordModal: !!passwordModal,
    setShowPasswordModal: (show: boolean) =>
      setPasswordModal(show ? passwordModal : null),
    passwordError: passwordModal?.error || null,
  };
}
