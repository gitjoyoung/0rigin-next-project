import { updateDeletePost } from '@/app/api/board/updatePostApi'
import { ROUTES } from '@/constants/route'
import { useRouter } from 'next/navigation'
import React, { useRef, useEffect } from 'react'

interface Props {
   onClose: () => void
   postId: string
   flag: 'delete' | 'edit'
}

export default function BoardModal({ onClose, postId, flag }: Props) {
   const inputRef = useRef<HTMLInputElement>(null)
   const router = useRouter()

   useEffect(() => {
      inputRef.current?.focus()
   }, [])

   const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
   }

   const handleUpdate = async () => {
      try {
         if (flag === 'delete') {
            updateDeletePost(postId)
            onClose()
            router.push(ROUTES.BOARD)
         } else if (flag === 'edit') {
            router.push(`${ROUTES.BOARD_UPDATE}/${postId}`)
            onClose()
         }
      } catch (error) {
         console.error('Failed to update board:', error)
      }
   }

   const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Enter') {
         handleUpdate()
      }
   }

   return (
      <div
         className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50  h-full w-full"
         onClick={onClose}
         onKeyDown={handleKeyPress}
         role="button"
         tabIndex={0}
      >
         <div
            className="mx-4 p-5 border w-[50] shadow-lg rounded-md relative bg-white"
            onClick={handleModalClick}
            onKeyDown={handleKeyPress}
            role="button"
            tabIndex={0}
         >
            <div
               className="absolute top-2 right-3 text-2xl cursor-pointer"
               onClick={onClose}
               onKeyDown={handleKeyPress}
               role="button"
               tabIndex={-1}
            >
               X
            </div>
            <div className="mt-3 text-center flex flex-col items-center gap-2">
               <h1 className="text-lg leading-6 font-medium text-gray-900">
                  {`${postId}번 글 ${flag === 'delete' ? '삭제하기' : '수정하기'}`}
               </h1>
               <p className="text-sm text-gray-500">비밀번호를 입력해주세요.</p>

               <input
                  ref={inputRef}
                  className="border-black border  w-[50%] my-2 p-1"
                  type="password"
                  name="password"
               />
               <button
                  type="button"
                  onClick={handleUpdate}
                  id="delete-btn"
                  className="px-6 py-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
               >
                  확인
               </button>
            </div>
         </div>
      </div>
   )
}
