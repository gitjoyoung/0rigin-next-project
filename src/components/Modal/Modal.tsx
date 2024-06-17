import React from 'react'
import { useModalStore } from '@/store/modal'
import ModalUi from './ModalUi'
import ModalWrap from './ModalWrap'

export default function Modal() {
   const { open, isOpen, close } = useModalStore((state) => ({
      isOpen: state.isOpen,
      close: state.close,
      open: state.open,
   }))

   const handleConfirm = () => {
      close()
   }
   return (
      <>
         <button type="button" onClick={open}>
            모달열기
         </button>
         <button type="button" onClick={close}>
            모달닫기
         </button>
         {isOpen && (
            <ModalWrap>
               <ModalUi
                  title="모달입니다"
                  content="모달내용"
                  onConfirm={handleConfirm}
               />
            </ModalWrap>
         )}
      </>
   )
}
