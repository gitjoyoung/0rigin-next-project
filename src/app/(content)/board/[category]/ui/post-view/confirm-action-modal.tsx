import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '@/shared/shadcn/ui/alert-dialog'

interface Props {
   open: boolean
   onOpenChange: (open: boolean) => void
   onConfirm: () => void
   mode: 'edit' | 'delete' | null
   loading?: boolean
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
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>
                  {mode === 'delete' ? '게시글 삭제' : '게시글 수정'}
               </AlertDialogTitle>
               <AlertDialogDescription>
                  {mode === 'delete'
                     ? '정말로 이 게시글을 삭제하시겠습니까? 삭제된 게시글은 복구할 수 없습니다.'
                     : '정말로 이 게시글을 수정하시겠습니까?'}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel disabled={loading}>취소</AlertDialogCancel>
               <AlertDialogAction onClick={onConfirm} disabled={loading}>
                  {mode === 'delete' ? '삭제' : '수정'}
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
