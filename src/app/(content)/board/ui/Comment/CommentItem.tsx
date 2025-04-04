'use client'

import { deleteComment } from '@/service/board/commentApi'
import { Button } from '@/shared/shadcn/ui/button'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { Icons } from '@/shared/ui/icons'
import { cn } from '@/shared/utils'
import type { CommentData } from '@/types/commentTypes'
import { useState } from 'react'

interface Props {
   commentData: CommentData
   isEditing: boolean
   setIsEditing: React.Dispatch<React.SetStateAction<string | null>>
}

export default function CommentItem({
   commentData,
   isEditing,
   setIsEditing,
}: Props) {
   const { id, postId, nickname, comment, createdAt } = commentData
   const [editContent, setEditContent] = useState(comment)

   const handleCancel = () => {
      setEditContent(comment)
      setIsEditing(null)
   }

   const handleEditSubmit = async () => {
      if (editContent.trim() === '') return
   }

   const handleDelete = async () => {
      if (!confirm('댓글을 삭제하시겠습니까?')) return
      await deleteComment(postId, id)
   }

   return (
      <div className={cn('flex flex-col min-h-9 group')}>
         {/* 댓글 정보 */}
         <div className="flex justify-between items-center py-1">
            {/* 댓글 작성자 정보 */}
            <div className="flex gap-1 items-center px-1">
               <p className="whitespace-nowrap text-left truncate font-semibold text-sm">
                  {nickname}
               </p>
               <p className="text-xs text-gray-600">{`${createdAt}`}</p>
            </div>
            {/* 버튼 그룹 */}
            <div className="flex items-center h-5 opacity-0 group-hover:opacity-100 transition-opacity">
               {!isEditing ? (
                  <>
                     <Button
                        type="button"
                        onClick={(e) => {
                           e.stopPropagation()
                           setIsEditing(id)
                        }}
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
                        variant="link"
                        size="icon"
                     >
                        <Icons.delete size={16} />
                     </Button>
                  </>
               ) : (
                  <>
                     <Button
                        type="button"
                        variant="link"
                        size="icon"
                        onClick={handleEditSubmit}
                     >
                        <Icons.check size={16} />
                     </Button>
                     <Button
                        type="button"
                        onClick={handleCancel}
                        variant="link"
                        size="icon"
                     >
                        <Icons.x size={16} />
                     </Button>
                  </>
               )}
            </div>
         </div>
         {/* 댓글 내용 */}
         <div className="pt-1">
            {!isEditing ? (
               <p className="text-sm break-words break-all min-w-60 whitespace-pre-wrap px-1">
                  {comment}
               </p>
            ) : (
               <Textarea
                  name="comment"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                     if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault()
                        handleEditSubmit()
                     }
                  }}
                  className="w-full border rounded-none p-1"
                  autoFocus
               />
            )}
         </div>
      </div>
   )
}
