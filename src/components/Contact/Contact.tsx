'use client'

import { CONTACT_INFO } from '@/constants/contact/contactNav'
import { Icons } from '@/shared/ui/icons'
import Image from 'next/image'

export default function Contact() {
   return (
      <section className="px-4 py-8   bg-gray-100">
         <div className="max-w-4xl mx-auto ">
            <h1 className="text-3xl font-semibold  mb-6">
               {CONTACT_INFO.title}
            </h1>
            <div className="flex flex-wrap  gap-6 w-full ">
               <div className="flex-1  md:h-auto w-full h-64  overflow-hidden shadow-md relative">
                  <Image
                     src="/mascot/winksaurus.png"
                     fill
                     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                     alt="apple logo"
                  />
               </div>

               <div className="grid grid-cols-1  gap-6 md:w-auto  w-full ">
                  <button
                     type="button"
                     className="p-6 bg-white  shadow-md"
                     onClick={() => {
                        navigator.clipboard.writeText(CONTACT_INFO.email)
                     }}
                  >
                     <div className="flex items-center mb-4 w-full">
                        <Icons.email className="text-blue-500 mr-4" size="2x" />
                        <h2 className="text-xl font-semibold">이메일</h2>
                     </div>
                     <p className="text-gray-700 text-left">
                        {CONTACT_INFO.email}
                     </p>
                  </button>

                  {/* 주소 */}
                  <button
                     type="button"
                     className="p-6 bg-white  shadow-md"
                     onClick={() => {
                        navigator.clipboard.writeText(CONTACT_INFO.address)
                     }}
                  >
                     <div className="flex items-center mb-4">
                        <Icons.mapMarkerAlt
                           className="text-blue-500 mr-4"
                           size="2x"
                        />
                        <h2 className="text-xl font-semibold">주소</h2>
                     </div>
                     <p className="text-gray-700 text-left">
                        {CONTACT_INFO.address}
                     </p>
                  </button>
               </div>
            </div>
         </div>
      </section>
   )
}
