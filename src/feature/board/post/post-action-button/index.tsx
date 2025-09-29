"use client";

import { Button } from "@/shared/shadcn/ui/button";
import { cn } from "@/shared/utils/cn";
import PasswordConfirmModal from "../post-view/password-conrifm-modal";
import { usePostActions } from "./hook/use-post-action";
import ConfirmActionModal from "./ui/confirm-action-modal";

export interface PostActionButtonsProps {
  post?: {
    postId: string;
    category: string;
    nickname?: string;
    author_id?: string;
  };
}

export default function PostActionButtons({ post }: PostActionButtonsProps) {
  const {
    action,
    passwordModal,
    confirmModal,
    handleEditDeleteState,
    closePasswordModal,
    closeConfirmModal,
    verifyPassword,
    confirmDelete,
  } = usePostActions({
    post,
  });

  return (
    <>
      <div className="flex gap-2 items-center">
        <Button
          variant="link"
          size="sm"
          className={cn("text-xs cursor-pointer p-0")}
          disabled={passwordModal.loading || confirmModal.loading}
          onClick={() => {
            handleEditDeleteState("edit");
          }}
        >
          수정
        </Button>
        <Button
          variant="link"
          size="sm"
          className={cn("text-xs cursor-pointer p-0")}
          disabled={passwordModal.loading || confirmModal.loading}
          onClick={() => {
            handleEditDeleteState("delete");
          }}
        >
          삭제
        </Button>
      </div>
      <PasswordConfirmModal
        open={passwordModal.open}
        onClose={closePasswordModal}
        onConfirm={verifyPassword}
        loading={passwordModal.loading}
        error={passwordModal.error || ""}
        title={action === "edit" ? "수정 하기" : "삭제 하기"}
      />
      <ConfirmActionModal
        open={confirmModal.open}
        onOpenChange={closeConfirmModal}
        onConfirm={confirmDelete}
        mode="delete"
        loading={confirmModal.loading}
      />
    </>
  );
}
