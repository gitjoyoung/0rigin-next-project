import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
   faEnvelope,
   faPhoneAlt,
   faMapMarkerAlt,
} from '@fortawesome/free-solid-svg-icons'

export default function Contact() {
   return (
      <section className="px-4 py-8 bg-gray-100">
         <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-semibold text-center mb-8">
               연락하기
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* 이메일 */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                     <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-blue-500 mr-4"
                        size="2x"
                     />
                     <h2 className="text-xl font-semibold">이메일</h2>
                  </div>
                  <p className="text-gray-700">contact@example.com</p>
               </div>
               {/* 전화번호 */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                     <FontAwesomeIcon
                        icon={faPhoneAlt}
                        className="text-blue-500 mr-4"
                        size="2x"
                     />
                     <h2 className="text-xl font-semibold">전화번호</h2>
                  </div>
                  <p className="text-gray-700">+1 (123) 456-7890</p>
               </div>
               {/* 주소 */}
               <div className="p-6 bg-white rounded-lg shadow-md">
                  <div className="flex items-center mb-4">
                     <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-blue-500 mr-4"
                        size="2x"
                     />
                     <h2 className="text-xl font-semibold">주소</h2>
                  </div>
                  <p className="text-gray-700">
                     123 Main Street, City, Country
                  </p>
               </div>
            </div>
         </div>
      </section>
   )
}
