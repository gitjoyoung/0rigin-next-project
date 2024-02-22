'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import INTRODUCE_TEXT from '@/constants/introduce/introduceText'
import CommunityStats from './CommunityStats'

export default function Introduce() {
   const scrollToSection = (ref) => {
      ref.current.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
         inline: 'center',
      })
   }
   const sectionsRef = {
      story: useRef(null),
      welcome: useRef(null),
      numbers: useRef(null),
   }
   return (
      <section className="flex flex-col   items-center bg-blue-500 text-center text-white relative">
         {/* 마스코트 이미지와 환영 인사 */}

         <div
            ref={sectionsRef.story}
            className="flex flex-col items-center max-w-[600px] gap-3 h-[100vh] justify-center  text-center animate-fadeIn "
         >
            <Image
               src="/mascot/winksaurus.png"
               alt="winksaurus"
               width={300}
               height={200}
            />{' '}
            <h1 className="text-2xl font-bold">{INTRODUCE_TEXT.story.title}</h1>
            <p className="break-words break-keep px-3">
               {INTRODUCE_TEXT.story.body}
            </p>
         </div>

         {/*  환영 인사 */}
         <div
            ref={sectionsRef.welcome}
            className="flex flex-col items-center justify-center max-w-[600px] gap-3 h-[100vh]"
         >
            <h1 className="text-2xl font-bold px-3">
               {INTRODUCE_TEXT.welcome.title}
            </h1>
            <p className="break-words break-keep px-3">
               {INTRODUCE_TEXT.welcome.body}
            </p>
         </div>

         {/* 숫자로 보는 0rigin */}
         <div
            ref={sectionsRef.numbers}
            className="flex flex-col items-center justify-center gap-3 w-full h-[100vh]"
         >
            <h1 className="text-2xl font-bold px-3">
               {INTRODUCE_TEXT.numbers.title}
            </h1>
            <p className="px-3"> {INTRODUCE_TEXT.numbers.body} </p>
            <p>마지막 업데이트: 24.04.23</p>
            <CommunityStats />
         </div>

         <nav className=" bottom-10 mr-5 self-end sticky ">
            <div className="flex flex-col gap-1">
               {Object.entries(sectionsRef).map(([key, ref]) => (
                  <button
                     className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-300 focus:outline-none focus:ring border-white hover:scale-105 transition-transform duration-300"
                     key={key}
                     type="button"
                     onClick={() => scrollToSection(ref)}
                  >
                     {key}
                  </button>
               ))}
            </div>
         </nav>
      </section>
   )
}
