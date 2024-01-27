'use client'

import Image from 'next/image'
import React, { useRef } from 'react'
import INTRODUCE_TEXT from '@/constants/Introduce/IntroduceText'
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
      sectionOne: useRef(null),
      sectionTwo: useRef(null),
      sectionThree: useRef(null),
   }
   return (
      <section className="flex flex-col   items-center bg-blue-500 text-white text-center">
         {/* 마스코트 이미지와 환영 인사 */}

         <div
            ref={sectionsRef.sectionOne}
            className="flex flex-col items-center max-w-[600px] gap-3 h-[100vh] justify-center  "
         >
            <Image
               src="/mascot/winksaurus.png"
               alt="winksaurus"
               width={300}
               height={200}
            />{' '}
            <h1 className="text-2xl font-bold">{INTRODUCE_TEXT.story.title}</h1>
            <p className="break-words break-keep">
               {INTRODUCE_TEXT.story.body}
            </p>
         </div>

         {/*  환영 인사 */}
         <div
            ref={sectionsRef.sectionTwo}
            className="flex flex-col items-center justify-center max-w-[600px] gap-3 h-[100vh]"
         >
            <h1 className="text-2xl font-bold">
               {INTRODUCE_TEXT.welcome.title}
            </h1>
            <p className="break-words break-keep">
               {INTRODUCE_TEXT.welcome.body}
            </p>
         </div>

         {/* 사이트 통계 */}
         <div
            ref={sectionsRef.sectionThree}
            className="flex flex-col items-center justify-center gap-3 w-full h-[100vh]"
         >
            <h1 className="text-2xl font-bold">
               {INTRODUCE_TEXT.numbers.body}
            </h1>
            <p> {INTRODUCE_TEXT.numbers.body} </p>
            <p>마지막 업데이트: 24.04.23</p>
            <CommunityStats />
         </div>

         <nav className=" flex-col   flex right-10 gap-1 fixed  top-1/2">
            {Object.entries(sectionsRef).map(([key, ref]) => (
               <button
                  key={key}
                  type="button"
                  onClick={() => scrollToSection(ref)}
               >
                  {key}
               </button>
            ))}
         </nav>
      </section>
   )
}
