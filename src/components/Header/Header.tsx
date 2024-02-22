'use client'

import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import headerNav from '@/constants/home/headerNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger, faX, faBell } from '@fortawesome/free-solid-svg-icons'
import { Popover, Transition } from '@headlessui/react'
import AuthButton from './AuthButton'
import SearchBox from './SearchBox'
import NavModal from './NavModal'

export default function Header() {
   // 모달 상태
   const [isModalOpen, setIsModalOpen] = useState(false)
   // 모달 스위치
   const toggleModal = () => setIsModalOpen((prevState) => !prevState)

   return (
      <header className="flex justify-between p-1 sm:p-3 items-end  w-full border-b mt-1 mb-2 border-black  shadow-md">
         {/* 로고 */}
         <Link href="/">
            <h1 className="md:text-4xl text-xl font-bold ">0rigin</h1>
         </Link>
         {/* 메뉴 네비게이터 */}
         <nav className="flex-1 hidden md:flex  ml-10 flex items-end gap-8 text-gray-600 ">
            {headerNav.map(({ title, url }) => (
               <Link key={title} href={url}>
                  <p className="hover:text-gray-900 hover:font-semibold text-md font-normal ">
                     {title}
                  </p>
               </Link>
            ))}
         </nav>
         {/* 서치바 */}
         <div className="flex-1 max-w-48 mx-3">
            <SearchBox />
         </div>
         {/* 반응형 네비게이션 */}
         <div className="flex items-end gap-5">
            {/* PC 화면 로그인,  회원가입 */}
            <div className="hidden md:flex ">
               <AuthButton />
            </div>

            {/* MOBILE 화면  버튼 */}
            <div className="md:hidden  flex gap-2 items-center">
               {/* 알림버튼 개발 중 */}
               <button
                  className="flex gap-1"
                  type="button"
                  aria-label="알림 버튼"
               >
                  <p className="text-xs">{1}</p>{' '}
                  <FontAwesomeIcon icon={faBell} size="lg" />
               </button>
               <div className="relative">
                  <button
                     className="border p-1 "
                     type="button"
                     onClick={toggleModal}
                     aria-label="메뉴 버튼"
                  >
                     <FontAwesomeIcon icon={faBurger} size="lg" />
                  </button>
                  {/* 모달 애니메이션  */}
                  <NavModal
                     isModalOpen={isModalOpen}
                     toggleModal={toggleModal}
                  />
               </div>
            </div>
         </div>

         {/* 모달 배경 */}
         <div
            className={`fixed  inset-0 z-40 ${isModalOpen ? 'block' : 'hidden'}`}
            onClick={toggleModal}
            aria-hidden="true"
         />
      </header>
   )
}
