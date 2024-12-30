import React, { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import { HEADER_NAV_LIST } from '@/constants/home/headerNav'
import { Icons } from '@/shared/ui/icons'
import Link from 'next/link'
import AuthButtonGroup from '../AuthButtonGroup'

interface Props {
   isModalOpen: boolean
   toggleModal: () => void
}

export default function MobileNavModal({ isModalOpen, toggleModal }: Props) {
   return (
      <>
         {/* 모달 애니메이션  */}
         <Transition
            as={Fragment}
            show={isModalOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            {/* 메뉴 네비게이터 모달 */}
            <div className="absolute  right-0 w-[200px]  max-w-sm border pb-3 border-black bg-white p-2 shadow-md z-50">
               {/* 모달 닫기 버튼 */}
               <div className="text-right">
                  <button
                     type="button"
                     className="px-1"
                     onClick={toggleModal}
                     aria-label="Toggle Menu"
                  >
                     <Icons.x size="lg" />
                  </button>
               </div>

               {/* 모바일 화면 로그인,  회원가입 */}
               <div className="flex flex-col gap-3">
                  <div className="flex justify-center border gap-2 py-2">
                     <AuthButtonGroup />
                  </div>
                  {/* 모바일 화면 네비게이터 */}
                  {HEADER_NAV_LIST.map(({ id, url, title }) => (
                     <Link key={id} href={url}>
                        <p className="hover:text-gray-900 hover:font-semibold textid,-md font-normal id2">
                           {title}
                        </p>
                     </Link>
                  ))}
               </div>
            </div>
         </Transition>
      </>
   )
}
