'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { useState } from 'react'
import ConfirmActionModal from './confirm-action-modal'
import { usePostActions } from './hooks/use-post-actions'
import PasswordConfirmModal from './password-conrifm-modal'

interface Props {
   postId: string
   category: string
}

export default function PostUpdateButtons({ postId, category }: Props) {
   const [passwordModalOpen, setPasswordModalOpen] = useState(false)
   const [confirmModalOpen, setConfirmModalOpen] = useState(false)
   const [currentAction, setCurrentAction] = useState<'edit' | 'delete' | null>(
      null,
   )

   const {
      isCheckingAuthor,
      isVerifyingPassword,
      isDeletingPost,
      checkAuthor,
      verifyPassword,
      deletePost,
      navigateToEdit,
      passwordError,
   } = usePostActions(postId, category)

   const isLoading = isCheckingAuthor || isVerifyingPassword || isDeletingPost

   const handleAction = async (action: 'edit' | 'delete') => {
      setCurrentAction(action)

      try {
         const result = await checkAuthor()

         if (result.data?.isAuthor) {
            // 작성자인 경우 바로 확인 모달
            setConfirmModalOpen(true)
         } else {
            // 비회원 게시글인 경우 비밀번호 모달
            setPasswordModalOpen(true)
         }
      } catch (error) {
         // 에러 발생 시 비밀번호 모달
         setPasswordModalOpen(true)
      }
   }

   const handlePasswordConfirm = async (password: string) => {
      return new Promise<void>((resolve, reject) => {
         verifyPassword(password, {
            onSuccess: () => {
               setPasswordModalOpen(false)
               setConfirmModalOpen(true)
               resolve()
            },
            onError: (error) => {
               reject(error)
            },
         })
      })
   }

   const handleFinalConfirm = () => {
      if (currentAction === 'edit') {
         navigateToEdit()
      } else if (currentAction === 'delete') {
         deletePost()
      }

      // 모달 닫기 및 상태 초기화
      setConfirmModalOpen(false)
      setCurrentAction(null)
   }

   const handleModalClose = () => {
      setPasswordModalOpen(false)
      setConfirmModalOpen(false)
      setCurrentAction(null)
   }

   return (
      <>
         <PasswordConfirmModal
            open={passwordModalOpen}
            onClose={handleModalClose}
            onConfirm={handlePasswordConfirm}
            loading={isVerifyingPassword}
            error={passwordError || ''}
         />

         <ConfirmActionModal
            open={confirmModalOpen}
            onOpenChange={setConfirmModalOpen}
            onConfirm={handleFinalConfirm}
            mode={currentAction}
            loading={isLoading}
         />

         <div className="flex justify-end gap-3 my-2">
            <Button
               variant="outline"
               size="sm"
               onClick={() => handleAction('edit')}
               disabled={isLoading}
            >
               수정
            </Button>
            <Button
               variant="outline"
               size="sm"
               onClick={() => handleAction('delete')}
               disabled={isLoading}
            >
               삭제
            </Button>
         </div>
      </>
   )
}
