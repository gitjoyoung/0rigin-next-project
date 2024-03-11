import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger } from '@fortawesome/free-solid-svg-icons'
import MobileNavModal from './MobileNavModal'

export default function MobileMenuButton() {
   const [isModalOpen, setIsModalOpen] = useState(false)

   const toggleModal = () => setIsModalOpen((prevState) => !prevState)

   return (
      <div className="relative">
         <button
            className=" p-1 "
            type="button"
            onClick={toggleModal}
            aria-label="메뉴 버튼"
         >
            <FontAwesomeIcon icon={faBurger} size="lg" />
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
