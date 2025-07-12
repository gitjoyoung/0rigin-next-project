'use client'

import { useToast } from '@/shared/hooks/use-toast'
import { Button } from '@/shared/shadcn/ui/button'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import PasswordConfirmModal from '../post-view/password-conrifm-modal'
import ConfirmActionModal from './confirm-action-modal'

interface PostActionButtonsProps {
   postId: string
   category: string
}

export default function PostActionButtons({
   postId,
   category,
}: PostActionButtonsProps) {
   const [action, setAction] = useState<'edit' | 'delete' | null>(null)
   const [passwordModalOpen, setPasswordModalOpen] = useState(false)
   const [confirmModalOpen, setConfirmModalOpen] = useState(false)
   const [isVerifyingPassword, setIsVerifyingPassword] = useState(false)
   const [isDeletingPost, setIsDeletingPost] = useState(false)
   const [passwordError, setPasswordError] = useState<string | null>(null)
   const router = useRouter()
   const { toast } = useToast()

   // 비밀번호 검증
   const handlePasswordConfirm = async (password: string) => {
      setIsVerifyingPassword(true)
      setPasswordError(null)
      const res = await fetch(`/api/post/${postId}/verify-password`, {
         method: 'POST',
         body: JSON.stringify({ password }),
         headers: { 'Content-Type': 'application/json' },
      }).catch(() => null)
      if (!res) {
         setPasswordError('비밀번호 검증 중 오류가 발생했습니다.')
         setIsVerifyingPassword(false)
         return
      }
      if (!res.ok) {
         const data = await res.json().catch(() => ({}))
         setPasswordError(data?.message || '비밀번호 검증에 실패했습니다.')
         setIsVerifyingPassword(false)
         return
      }
      setPasswordModalOpen(false)
      setIsVerifyingPassword(false)
      if (action === 'edit') {
         router.push(`/board/${category}/update/${postId}`)
      } else if (action === 'delete') {
         setConfirmModalOpen(true)
      }
   }

   // 삭제 확정
   const handleFinalConfirm = async () => {
      setIsDeletingPost(true)
      const res = await fetch(`/api/post/${postId}`, {
         method: 'DELETE',
         headers: { 'Content-Type': 'application/json' },
      }).catch(() => null)
      if (!res) {
         toast({
            variant: 'destructive',
            title: '삭제 실패',
            description: '삭제 중 오류가 발생했습니다.',
         })
         setIsDeletingPost(false)
         return
      }
      if (!res.ok) {
         const data = await res.json().catch(() => ({}))
         toast({
            variant: 'destructive',
            title: '삭제 실패',
            description: data?.error || '삭제에 실패했습니다.',
         })
         setIsDeletingPost(false)
         return
      }
      toast({
         title: '삭제 완료',
         description: '게시글이 성공적으로 삭제되었습니다.',
      })
      setConfirmModalOpen(false)
      setIsDeletingPost(false)
      router.push(`/board/${category}`)
   }

   return (
      <>
         <div className="flex gap-3">
            <Button
               size="sm"
               className="text-xs"
               onClick={() => {
                  setAction('edit')
                  setPasswordModalOpen(true)
               }}
               variant="outline"
            >
               수정
            </Button>
            <Button
               size="sm"
               className="text-xs"
               onClick={() => {
                  setAction('delete')
                  setPasswordModalOpen(true)
               }}
               variant="outline"
            >
               삭제
            </Button>
         </div>
         <PasswordConfirmModal
            open={passwordModalOpen}
            onClose={() => setPasswordModalOpen(false)}
            onConfirm={handlePasswordConfirm}
            loading={isVerifyingPassword}
            error={passwordError || ''}
         />
         <ConfirmActionModal
            open={confirmModalOpen}
            onOpenChange={setConfirmModalOpen}
            onConfirm={handleFinalConfirm}
            mode="delete"
            loading={isDeletingPost}
         />
      </>
   )
}
