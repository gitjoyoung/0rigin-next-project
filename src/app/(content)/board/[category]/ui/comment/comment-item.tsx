'use client'

import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/shadcn/ui/avatar'
import { Button } from '@/shared/shadcn/ui/button'
import { Textarea } from '@/shared/shadcn/ui/textarea'
import { Icons } from '@/shared/ui/icons'
import { cn } from '@/shared/utils/cn'
import formatDate from '@/shared/utils/validators/board/format-date'
import { useState } from 'react'
import type { IComment } from '../../types/comment-type'

interface Props {
   commentData: IComment
   isEditing: boolean
   setIsEditing: React.Dispatch<React.SetStateAction<string | null>>
   refetch: () => void
}

export default function CommentItem({
   commentData,
   isEditing,
   setIsEditing,
   refetch,
}: Props) {
   const { id, nickname, content, created_at } = commentData
   const [editContent, setEditContent] = useState(content)

   const supabase = SupabaseBrowserClient()

   const handleCancel = () => {
      setEditContent(content)
      setIsEditing(null)
   }

   const handleEditSubmit = async () => {
      if (editContent.trim() === '') return
      const { error } = await supabase
         .from('comments')
         .update({
            content: editContent,
            is_edited: true,
         })
         .eq('id', id)
      if (error) {
         alert(`댓글 수정 오류: ${JSON.stringify(error)}`)
      } else {
         setIsEditing(null)
         refetch()
      }
   }

   const handleDelete = async () => {
      if (!confirm('댓글을 삭제하시겠습니까?')) return
      const { error } = await supabase.from('comments').delete().eq('id', id)
      if (error) {
         alert(`댓글 삭제 오류: ${JSON.stringify(error)}`)
      } else {
         setIsEditing(null)
         refetch()
      }
   }

   return (
      <div className="flex gap-3 py-3 ">
         <Avatar className={cn('w-10 h-10 my-1 ')}>
            <AvatarImage
               src="https://github.com/shadcn.png"
               alt="shadcn"
               className="w-full h-full"
            />
            <AvatarFallback>{nickname.slice(0, 2)}</AvatarFallback>
         </Avatar>

         <div className={cn('flex flex-col min-h-9 group flex-1')}>
            {/* 댓글 헤더 */}
            <div className="flex justify-between items-center py-1">
               {/* 댓글 작성자 정보 */}
               <div className="flex  gap-3 items-center px-1">
                  <p className="whitespace-nowrap text-left truncate font-semibold text-sm">
                     {nickname}
                  </p>
                  <p className="text-xs text-gray-600">
                     {formatDate(created_at)}
                  </p>
               </div>
               {/* 버튼 그룹 */}
               <div className="flex items-center h-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!isEditing ? (
                     <>
                        <Button
                           type="button"
                           onClick={(e) => {
                              e.stopPropagation()
                              setIsEditing(id.toString())
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
            <div>
               {!isEditing ? (
                  <p className="text-sm break-words break-all min-w-60 whitespace-pre-wrap px-1">
                     {content}
                  </p>
               ) : (
                  <Textarea
                     name="comment"
                     value={editContent}
                     onChange={(e) => setEditContent(e.target.value)}
                     onKeyDown={(
                        e: React.KeyboardEvent<HTMLTextAreaElement>,
                     ) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                           e.preventDefault()
                           handleEditSubmit()
                        }
                     }}
                     className={cn(
                        'w-full border rounded-none p-1 focus-visible:outline-none rounded-sm',
                        isEditing && 'h-20 sm:text-sm',
                     )}
                     autoFocus
                  />
               )}
            </div>
         </div>
      </div>
   )
}
