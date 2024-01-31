import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useRef, useEffect, useState } from 'react'

interface BoardModalProps {
   onClose: () => void
   id: string
   deleteFlag?: boolean
   editFlag?: boolean
}

export default function BoardModal({
   onClose,
   id,
   editFlag = false,
   deleteFlag = false,
}: BoardModalProps) {
   const inputRef = useRef<HTMLInputElement>(null)
   const router = useRouter()
   /** 모달이 열릴때 포커스 */
   useEffect(() => {
      if (inputRef.current) {
         inputRef.current.focus()
      }
   }, [])

   const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
   }

   const handleDelete = async () => {
      try {
         await axios.delete(`${process.env.NEXT_PUBLIC_API_URL} board/${id}`)
         onClose()
      } catch (error) {
         console.error(error)
      }
   }

   const handleUpdate = async () => {
      try {
         router.push(`/board/update/${id}`)
      } catch (error) {
         console.error(error)
      }
   }

   return (
      <div
         className="fixed inset-0 flex justify-center items-center bg-gray-600 bg-opacity-50 z-50  h-full w-full"
         onClick={onClose}
         onKeyDown={() => {}}
         role="button" // Add role attribute
         tabIndex={0} // Add tabIndex attribute
      >
         <div
            className="mx-4 p-5 border w-[50] shadow-lg rounded-md relative bg-white"
            onClick={handleModalClick}
            onKeyDown={() => {}}
            role="button"
            tabIndex={0}
         >
            <div
               className="absolute top-2 right-3 text-2xl"
               onClick={onClose}
               onKeyDown={() => {}}
               role="button"
               tabIndex={-1}
            >
               X
            </div>
            <div className="mt-3 text-center flex flex-col items-center gap-2">
               <h1 className="text-lg leading-6 font-medium text-gray-900">
                  {id} 글 수정하기
               </h1>
               <p className="text-sm text-gray-500">비밀번호를 입력해주세요.</p>

               <input
                  ref={inputRef}
                  className="border-black border  w-[50%] my-2 p-1"
                  type="password"
                  name="password"
               />
               <div>
                  {editFlag && (
                     <button
                        type="button"
                        onClick={handleUpdate}
                        id="update-btn"
                        className=" px-6 py-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
                     >
                        수정하기
                     </button>
                  )}
                  {deleteFlag && (
                     <button
                        type="button"
                        onClick={handleDelete}
                        id="delete-btn"
                        className=" px-6 py-2 hover:bg-white focus:outline-none focus:ring-2 focus:ring-red-300"
                     >
                        삭제
                     </button>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}
