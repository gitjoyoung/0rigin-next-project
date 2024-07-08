'use client'

import { TERMS_CONTENT } from '@/constants/auth/signUpTermsText'
import React, { useState } from 'react'

type Props = {
   onTermsAgreed: () => void
}

export default function TermsOfService({ onTermsAgreed }: Props) {
   // 이용약관 동의 체크박스
   const [checkTerm, setCheckTerm] = useState<boolean>(false)

   const moveSignUpPage = (): void => {
      if (checkTerm) {
         onTermsAgreed()
      } else {
         alert('이용약관 동의 해주세요')
      }
   }

   return (
      <section className=" flex flex-col items-center m-3">
         <div className=" ">
            <h2 className="font-bold text-lg">{TERMS_CONTENT.title}</h2>
            <div className=" border border-gray-300 rounded-lg h-48  p-2 overflow-y-auto">
               <p>{TERMS_CONTENT.content}</p>
            </div>
         </div>
         <div className="m-2 ">
            <label htmlFor="agree">
               <input
                  type="checkbox"
                  checked={checkTerm}
                  onChange={(e) => setCheckTerm(e.target.checked)}
                  className="scale-150 mx-2"
                  id="agree"
               />
               {TERMS_CONTENT.agree}
            </label>
         </div>
         <div className="flex  items-center justify-center gap-4">
            <button
               className="p-2 w-[200px] "
               type="button"
               onClick={moveSignUpPage}
               disabled={!checkTerm}
            >
               확인
            </button>
         </div>
      </section>
   )
}
