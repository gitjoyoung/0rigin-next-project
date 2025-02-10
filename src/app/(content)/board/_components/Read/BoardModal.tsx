'use client'
import { ROUTES } from '@/constants/route'
import { updateDeletePost } from '@/service/board/post/updatePostApi'
import { Button } from '@/shared/shadcn/ui/button'
import { Input } from '@/shared/shadcn/ui/input'
import { X } from 'lucide-react'
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
      if (flag === 'delete') {
         updateDeletePost(postId)
         router.push(ROUTES.BOARD)
         onClose()
      } else if (flag === 'edit') {
         router.push(`${ROUTES.BOARD_UPDATE}/${postId}`)
         onClose()
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
         role="button"
         tabIndex={0}
      >
         <div
            className="mx-4 p-5 border  shadow-lg rounded-md relative bg-white"
            onClick={handleModalClick}
            role="button"
            tabIndex={0}
         >
            {/* <div
               className="absolute top-2 right-3 text-2xl cursor-pointer"
               onClick={onClose}
               role="button"
               tabIndex={-1}
            >
               X
            </div> */}
            <Button
               variant="ghost"
               size="icon"
               onClick={onClose}
               className=" rounded-sm bg-transparent border-none absolute top-0 right-0  cursor-pointer"
            >
               <X className="h-4 w-4" />
            </Button>
            <div className="mt-3 text-center flex flex-col items-center gap-2">
               <h1 className="text-lg leading-6 font-medium text-gray-900">
                  {`${postId}번 글 ${flag === 'delete' ? '삭제하기' : '수정하기'}`}
               </h1>
               <p className="text-sm text-gray-500">비밀번호를 입력해주세요.</p>

               <Input
                  ref={inputRef}
                  className="border-black border  w-[80%] my-2 "
                  type="password"
                  name="password"
                  onKeyDown={handleKeyPress}
               />
               <Button onClick={handleUpdate} size="default">
                  확인
               </Button>
            </div>
         </div>
      </div>
   )
}
