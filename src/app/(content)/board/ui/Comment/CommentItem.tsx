'use client'

import { deleteComment } from '@/service/board/commentApi'
import { Button } from '@/shared/shadcn/ui/button'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { Icons } from '@/shared/ui/icons'
import type { CommentData } from '@/types/commentTypes'
import { useState } from 'react'
import CommentDialog from './\bCommentDialog'

interface Props {
   commentData: CommentData
}

export default function CommentItem({ commentData }: Props) {
   const { id, postId, nickname, comment, createdAt } = commentData

   const [isEdit, setIsEdit] = useState(false)
   const [buttonDisabled, setButtonDisabled] = useState(false)
   const [editContent, setEditContent] = useState(comment)
   const [isSelected, setIsSelected] = useState(false)
   const [isDialogOpen, setIsDialogOpen] = useState(false)

   const handleCommentClick = () => {
      setIsSelected(!isSelected)
   }

   const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      console.log('e', e)
      const formData = new FormData(e.target as HTMLFormElement)
      const password = formData.get('password')
      console.log('password', password)
      if (password === '1234') {
         setIsEdit(true)
      } else {
         alert('비밀번호가 틀렸습니다.')
      }
   }

   const handleCancel = () => {
      setIsEdit(false)
      setEditContent(comment)
   }

   const handleSubmit = async () => {
      if (editContent.trim() === '') return

      setButtonDisabled(true)
      try {
         // await updateComment(postId, id, editContent)
         setIsEdit(false)
      } catch (error) {
         console.error('댓글 수정 실패:', error)
      } finally {
         setButtonDisabled(false)
      }
   }

   const handleDelete = async () => {
      if (!confirm('댓글을 삭제하시겠습니까?')) return

      setButtonDisabled(true)
      try {
         await deleteComment(postId, id)
      } catch (error) {
         console.error('댓글 삭제 실패:', error)
      } finally {
         setButtonDisabled(false)
      }
   }

   return (
      <>
         <CommentDialog
            title="댓글 수정"
            description="게시물을 작성한 사람만 삭제할 수 있습니다. 비밀번호를 입력해주세요."
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
            handleSubmit={handleEdit}
         />
         <div
            className="flex flex-col min-h-9 hover:bg-gray-600 cursor-pointer"
            onClick={handleCommentClick}
         >
            <div className="flex justify-between items-center py-1">
               <div className="flex gap-1 items-center px-1">
                  <p className="whitespace-nowrap text-left truncate font-semibold text-sm ">
                     {nickname}
                  </p>
                  <p className="text-xs text-gray-600">{`${createdAt}`}</p>
               </div>

               <div className="flex items-center h-5">
                  {isSelected && !isEdit && (
                     <>
                        <Button
                           type="button"
                           onClick={(e) => {
                              e.stopPropagation()
                              setIsDialogOpen(true)
                           }}
                           disabled={buttonDisabled}
                           variant="link"
                           size="icon"
                        >
                           <Icons.edit size={16} />
                        </Button>
                        <Button
                           type="button"
                           onClick={(e) => {
                              e.stopPropagation()
                              handleDelete()
                           }}
                           disabled={buttonDisabled}
                           variant="link"
                           size="icon"
                        >
                           <Icons.delete size={16} />
                        </Button>
                     </>
                  )}
                  {isEdit && (
                     <>
                        <Button
                           type="button"
                           onClick={(e) => {
                              e.stopPropagation()
                              handleSubmit()
                           }}
                           disabled={buttonDisabled}
                           variant="link"
                           size="icon"
                        >
                           <Icons.check size={16} />
                        </Button>
                        <Button
                           type="button"
                           onClick={(e) => {
                              e.stopPropagation()
                              handleCancel()
                           }}
                           disabled={buttonDisabled}
                           variant="link"
                           size="icon"
                        >
                           <Icons.x size={16} />
                        </Button>
                     </>
                  )}
               </div>
            </div>
            <div className="pt-1">
               {!isEdit ? (
                  <p className="break-words break-all min-w-60 whitespace-pre-wrap px-1 ">
                     <span className="text-sm">{comment}</span>
                  </p>
               ) : (
                  <Textarea
                     value={editContent}
                     onChange={(e) => setEditContent(e.target.value)}
                     className="w-full border border-black dark:border-white rounded-none p-1 "
                  />
               )}
            </div>
         </div>
      </>
   )
}
