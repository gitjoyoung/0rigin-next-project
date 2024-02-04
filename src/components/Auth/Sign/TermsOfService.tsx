'use client'

import TERMS_CONTENT from '@/constants/auth/termsContentText'
import React, { useState } from 'react'

type TermsOfServiceProps = {
   onTermsAgreed: () => void
}

export default function TermsOfService({ onTermsAgreed }: TermsOfServiceProps) {
   const terms: string = TERMS_CONTENT

   // 이용약관 동의 체크박스
   const [checkTerm, setCheckTerm] = useState<boolean>(false)

   /**
    * 체크박스 변경 이벤트
    * @returns {void}
    */
   const handleCheckboxChange = (): void => {
      setCheckTerm(!checkTerm)
   }
   /**
    * 회원가입 페이지로 이동
    * @returns {void}
    */
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
            <h2 className="font-bold text-lg">이용약관</h2>
            <div className=" border border-gray-300 rounded-lg h-48  p-2 overflow-y-auto">
               <p>{terms}</p>
            </div>
         </div>
         <div className="m-2 ">
            <label htmlFor="agree">
               <input
                  type="checkbox"
                  checked={checkTerm}
                  onChange={handleCheckboxChange}
                  className="scale-150 mx-2"
                  value="asd"
                  id="agree"
               />
               0rigin 이용약관에 동의하기
            </label>
         </div>
         <div className="flex  items-center justify-center gap-4">
            <button
               className="p-2 w-[200px] "
               type="button"
               onClick={moveSignUpPage}
            >
               확인
            </button>
         </div>
      </section>
   )
}
