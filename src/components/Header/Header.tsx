'use client'

import Link from 'next/link'
import React, { Fragment, useState } from 'react'
import headerNav from '@/constants/home/headerNav'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBurger, faX, faBell } from '@fortawesome/free-solid-svg-icons'
import { Transition } from '@headlessui/react'
import AuthButton from './AuthButton'
import SearchBox from './SearchBox'

export default function Header() {
   const [isMenuOpen, setIsMenuOpen] = useState(false)
   const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen)
   }

   return (
      <header className="flex justify-between p-1 sm:p-3 items-end  w-full border-b mt-1 mb-2 border-black  shadow-md">
         {/* 로고 */}
         <Link href="/">
            <h1 className="md:text-4xl text-xl font-bold ">0rigin</h1>
         </Link>

         {/* 메뉴 리스트 */}
         <div className="flex-1 hidden md:flex justify-between ml-10">
            <nav className="flex items-end gap-8 text-gray-600 ">
               {headerNav.map(({ title, url }) => (
                  <Link key={title} href={url}>
                     <p className="hover:text-gray-900 hover:font-semibold text-md font-normal ">
                        {title}
                     </p>
                  </Link>
               ))}
            </nav>
         </div>
         {/* 서치바 */}
         <div className="flex-1 max-w-48 mx-3">
            <SearchBox />
         </div>

         {/* 로그인 버튼 */}
         <div className="flex items-end gap-5">
            {/* 로그인 회원가입 버튼 모바일에서 숨김 처리 */}
            <div className="hidden md:flex ">
               <AuthButton name={undefined} />
            </div>

            {/* 모바일 화면 버튼 */}
            <div className="md:hidden flex gap-1 items-center">
               <button
                  type="button"
                  aria-label="알림"
                  onClick={() => console.log('알림')}
               >
                  <FontAwesomeIcon icon={faBell} size="lg" />
               </button>
               <button
                  className="border-none"
                  type="button"
                  onClick={toggleMenu}
                  aria-label="메뉴 토글"
               >
                  <FontAwesomeIcon icon={faBurger} size="lg" />
               </button>
            </div>
         </div>

         {/* 배경 클릭으로 메뉴 닫기 */}
         <div
            className={`fixed inset-0 z-40 ${isMenuOpen ? 'block' : 'hidden'}`}
            onClick={toggleMenu}
            aria-hidden="true"
         />

         <Transition
            as={Fragment}
            show={isMenuOpen}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
         >
            <div className="absolute top-[60px] right-0 w-2/4 max-w-sm border pb-3 border-black bg-white p-2 shadow-md z-50">
               <div className="text-right">
                  <button
                     type="button"
                     className="px-1"
                     onClick={toggleMenu}
                     aria-label="Toggle Menu"
                  >
                     <FontAwesomeIcon icon={faX} size="lg" />
                  </button>
               </div>
               <div
                  role="button"
                  tabIndex={0}
                  onClick={toggleMenu}
                  onKeyDown={(e) => {
                     if (e.key === 'Enter' || e.key === ' ') {
                        toggleMenu()
                     }
                  }}
               >
                  <AuthButton name={undefined} />
                  {headerNav.map(({ id, url, title }) => (
                     <Link key={id} href={url}>
                        <p className="hover:text-gray-900 hover:font-semibold textid,-md font-normal id2">
                           {title}
                        </p>
                     </Link>
                  ))}
               </div>
            </div>
         </Transition>
      </header>
   )
}
