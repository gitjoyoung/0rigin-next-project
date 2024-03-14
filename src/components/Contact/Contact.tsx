'use client'

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faEnvelope,
   faPhoneAlt,
   faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import { CONTACT_INFO } from '@/constants/contact/contactNav'

export default function Contact() {
   return (
      <section className="px-4 py-8  h-[80vh] bg-gray-100">
         <div className="max-w-4xl mx-auto ">
            <h1 className="text-3xl font-semibold  mb-6">
               {CONTACT_INFO.title}
            </h1>
            <div className="flex flex-wrap  gap-6 w-full ">
               <div className="flex-1  md:h-auto w-full h-64 rounded-lg overflow-hidden shadow-md bg-black relative">
                  <picture>
                     <source
                        type="image/webp"
                        srcSet="/webp/winkContact.webp"
                     />
                     <Image src="/webp/winkContact.png" fill alt="apple logo" />
                  </picture>
               </div>

               <div className="grid grid-cols-1  gap-6 md:w-auto  w-full ">
                  <button
                     type="button"
                     className="p-6 bg-white rounded-lg shadow-md"
                     onClick={() => {
                        navigator.clipboard.writeText(CONTACT_INFO.email)
                     }}
                  >
                     <div className="flex items-center mb-4 w-full">
                        <FontAwesomeIcon
                           icon={faEnvelope}
                           className="text-blue-500 mr-4"
                           size="2x"
                        />
                        <h2 className="text-xl font-semibold">이메일</h2>
                     </div>
                     <p className="text-gray-700 text-left">
                        {CONTACT_INFO.email}
                     </p>
                  </button>
                  {/* 전화번호 */}
                  <button
                     type="button"
                     className="p-6 bg-white rounded-lg shadow-md"
                     onClick={() => {
                        navigator.clipboard.writeText(CONTACT_INFO.phoneNumber)
                     }}
                  >
                     <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                           icon={faPhoneAlt}
                           className="text-blue-500 mr-4"
                           size="2x"
                        />
                        <h2 className="text-xl font-semibold">전화번호</h2>
                     </div>
                     <p className="text-gray-700 text-left">
                        {CONTACT_INFO.phoneNumber}
                     </p>
                  </button>
                  {/* 주소 */}
                  <button
                     type="button"
                     className="p-6 bg-white rounded-lg shadow-md"
                     onClick={() => {
                        navigator.clipboard.writeText(CONTACT_INFO.address)
                     }}
                  >
                     <div className="flex items-center mb-4">
                        <FontAwesomeIcon
                           icon={faMapMarkerAlt}
                           className="text-blue-500 mr-4"
                           size="2x"
                        />
                        <h2 className="text-xl font-semibold">주소</h2>
                     </div>
                     <p className="text-gray-700 ">{CONTACT_INFO.address}</p>
                  </button>
               </div>
            </div>
         </div>
      </section>
   )
}
