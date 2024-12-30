'use client'
import { useState } from 'react'
import MobileNavModal from './MobileNavModal'
import { Icons } from '@/shared/ui/icons'

export default function MobileMenuButton() {
   const [isModalOpen, setIsModalOpen] = useState(false)

   const toggleModal = () => setIsModalOpen((prevState) => !prevState)

   return (
      <div className="relative">
         <button
            className=" border-none "
            type="button"
            onClick={toggleModal}
            aria-label="메뉴 버튼"
         >
            <Icons.burger size="lg" />
         </button>
         <div
            className={`fixed  inset-0 z-40 ${isModalOpen ? 'block' : 'hidden'}`}
            onClick={toggleModal}
            aria-hidden="true"
         />
         <MobileNavModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
      </div>
   )
}
