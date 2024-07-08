'use client'

import BasicButton from '@/components/common/buttons/BasicButton'
import { deleteComment } from '@/service/board/commentApi'
import { useState } from 'react'
import { CommentData } from '../../_types/commentTypes'

interface Props {
   commentData: CommentData
}

export default function CommentItem({ commentData }: Props) {
   const { id, postId, nickname, comment, createdAt } = commentData

   const [isEdit, setIsEdit] = useState(false)
   const [buttonDisabled, setButtonDisabled] = useState(false)

   const handleEdit = () => {
      console.log('edit')
      setIsEdit((prev) => !prev)
   }
   const handleSubmit = async () => {
      console.log('submit')
      setButtonDisabled(true)
      await setTimeout(() => {
         setButtonDisabled(false)
         console.log('submit')
      }, 1000)
      // await updateComment(postId, id, comment)
      setIsEdit((prev) => !prev)
   }

   return (
      <div className="flex flex-col px-2 border last:border-b-0 text-sm min-h-9 hover:bg-gray-100">
         {/* 닉네임 , 수정 삭제 버튼 */}
         <div className="flex justify-between items-center ">
            <p className=" whitespace-nowrap text-left truncate font-semibold">
               {nickname}
            </p>
            <div className="flex gap-1 items-center">
               {!isEdit ? (
                  <BasicButton
                     type="button"
                     onClick={handleEdit}
                     text="수정"
                     disabled={buttonDisabled}
                  />
               ) : (
                  <BasicButton
                     type="button"
                     onClick={() => handleSubmit}
                     text="확인"
                     disabled={buttonDisabled}
                  />
               )}

               <BasicButton
                  type="button"
                  onClick={() => deleteComment(postId, id)}
                  text="삭제"
                  disabled={buttonDisabled}
               />
            </div>
         </div>
         {/* 내용 작성시간 */}
         <div className="py-1">
            {!isEdit ? (
               <p className="break-words break-all min-w-60 whitespace-pre-wrap">
                  {comment}
               </p>
            ) : (
               <textarea
                  name=""
                  id=""
                  defaultValue={comment}
                  className="w-full"
               />
            )}

            <div className="flex justify-end">
               <p className="w-15 text-xs text-gray-400  break-words">
                  {createdAt}
               </p>
            </div>
         </div>
      </div>
   )
}
