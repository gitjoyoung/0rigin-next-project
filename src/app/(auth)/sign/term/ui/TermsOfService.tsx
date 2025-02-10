'use client'
import React, { useState } from 'react'
import { TERMS_CONTENT } from '../../model/constants/terms'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@/shared/shadcn/ui/scroll-area'
import { Button } from '@/shared/shadcn/ui/button'
import { Checkbox } from '@/shared/shadcn/ui/checkbox'

export default function TermsOfService() {
   // 이용약관 동의 체크박스
   const [checkTerm, setCheckTerm] = useState<any>()
   const { push } = useRouter()

   const moveSignUpPage = (): void => {
      if (checkTerm) {
         push('/sign/form')
      } else {
         alert('이용약관 동의 해주세요')
      }
   }

   return (
      <section className=" w-full sm:w-[400px] flex flex-col m-auto items-center mt-10  gap-2 ">
         <div className="space-y-2">
            <h2 className="font-bold text-lg">{TERMS_CONTENT.title}</h2>
            <ScrollArea className=" h-80 w-full rounded-lg border">
               <div className="p-3">
                  <p className="mb-4 leading-6 whitespace-pre-line">
                     {TERMS_CONTENT.content}
                  </p>
               </div>
            </ScrollArea>
         </div>
         <div className="flex flex-col p-1 gap-3 w-full justify-start">
            <div className="flex items-center gap-2">
               <Checkbox
                  checked={checkTerm}
                  onCheckedChange={(checked) => {
                     setCheckTerm(!!checked)
                  }}
                  id="agree"
               />
               <label htmlFor="agree">{TERMS_CONTENT.agree}</label>
            </div>

            <div className="flex justify-center">
               <Button
                  className="px-16 py-4"
                  size="lg"
                  type="button"
                  onClick={moveSignUpPage}
                  disabled={!checkTerm}
               >
                  확인
               </Button>
            </div>
         </div>
      </section>
   )
}
