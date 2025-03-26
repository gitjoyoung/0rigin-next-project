'use client'
import { Button } from '@/shared/shadcn/ui/button'
import { Checkbox } from '@/shared/shadcn/ui/checkbox'
import { ScrollArea } from '@/shared/shadcn/ui/scroll-area'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const TERMS_CONTENT = {
   title: '이용 약관',
   agree: '0rigin 이용약관에 동의합니다!',
   content: `제1조 (서비스의 목적)
 본 서비스는 회원에게 제로리진(0rigin)이 제공하는 다양한 콘텐츠 및 기능을 통한 창의적인 활동과 소통의 기회를 제공하기 위해 제공됩니다.
 
 회원은 제로리진(0rigin) 서비스를 통해 자신의 창작물을 공유하고 다른 회원들과 소통할 수 있습니다.
 
 제2조 (서비스의 변경 및 중단)
 제로리진(0rigin)은 필요한 경우 언제든지 서비스의 내용을 변경하거나 중단할 수 있습니다. 이 경우 제로리진(0rigin)은 해당 내용을 사전에 공지합니다.
 
 서비스의 변경이나 중단으로 인해 발생하는 불편이나 손실에 대해서 제로리진(0rigin)은 책임을 지지 않습니다.
 
 제3조 (회원의 의무)
 회원은 본 서비스를 이용함에 있어서 다음 사항을 준수해야 합니다.
 
 다른 회원의 권리를 침해하지 않습니다.
 부적절한 콘텐츠를 업로드하거나 전파하지 않습니다.
 서비스의 안전성을 해치는 행위를 하지 않습니다.
 회원은 개인정보를 안전하게 보호하기 위해 비밀번호를 적절히 관리해야 합니다.
 
 제4조 (제로리진(0rigin)의 권리 및 의무)
 제로리진(0rigin)은 회원에게 안정적이고 원활한 서비스를 제공하기 위해 최선을 다하며, 서비스 개선을 위해 지속적으로 노력합니다.
 
 제로리진(0rigin)은 회원의 개인정보 보호를 위해 관련 법령 및 정책에 따라 노력합니다.`,
}

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
