import React, { Dispatch, SetStateAction } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'

type ModalState = Dispatch<SetStateAction<boolean>>
interface ModalProps {
   readonly isOpen: boolean
   readonly setOpen: ModalState
}
function UI({ setOpen }: { setOpen: ModalState }) {
   const { push } = useRouter()
   return (
      <div className="absolute top-0 flex flex-col items-center justify-center w-full h-[100vh] bg-opacity-45 bg-gray-500 z-10 ">
         <div className="p-20 bg-white border shadow-2xl border-black border-solid rounded-md">
            <p className="mb-10 text-xl text-center">빅픽처팀 개발자 모집중!</p>
            <div className="flex justify-between">
               <button
                  type="button"
                  className="border border-black border-solid rounded-md p-3.5 bg-white hover:font-bold "
                  onClick={() => {
                     push('/')
                     setOpen(false)
                  }}
               >
                  <span className="text-inherit">지원하기</span>
               </button>
               <button
                  type="button"
                  className="border border-black border-solid rounded-md p-3.5 bg-white hover:font-bold "
                  onClick={() => setOpen((prev) => !prev)}
               >
                  <span className="text-inherit">돌아가기</span>
               </button>
            </div>
         </div>
      </div>
   )
}
// 이 모달은 createPortal 를 활용한 전역 모달입니다
// isOpen 상태에 따라 모달을 렌더링합니다
function Modal({ isOpen, setOpen }: ModalProps) {
   if (!isOpen) return null
   return createPortal(
      <UI setOpen={setOpen} />,
      document.getElementById('modal-root') as HTMLDivElement,
   )
}
export default Modal
