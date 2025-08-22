import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/shadcn/ui/alert-dialog";
import { cn } from "@/shared/utils/cn";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  mode: "edit" | "delete" | null;
  loading?: boolean;
}

export default function ConfirmActionModal({
  open,
  onOpenChange,
  onConfirm,
  mode,
  loading = false,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          "fixed inset-x-0 top-0 left-0 right-0 bottom-auto",
          "translate-x-0 translate-y-0 rounded-b-2xl",
          "max-h-[calc(100dvh-32px)] overflow-y-auto",
          "pt-[calc(env(safe-area-inset-top,0px)+16px)]",
          "sm:inset-auto sm:top-1/2 sm:left-1/2",
          "sm:-translate-x-1/2 sm:-translate-y-1/2",
          "sm:rounded-lg",
        )}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            {mode === "delete" ? "게시글 삭제" : "게시글 수정"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {mode === "delete"
              ? "정말로 이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다."
              : "정말로 이 게시글을 수정하시겠습니까?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sticky bottom-0 bg-inherit z-10 pb-[env(safe-area-inset-bottom,0px)]">
          <AlertDialogCancel disabled={loading}>취소</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm} disabled={loading}>
            {mode === "delete" ? "삭제" : "수정"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
