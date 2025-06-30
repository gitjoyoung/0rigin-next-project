'use client'
import { Button } from '@/shared/shadcn/ui/button'
import { Checkbox } from '@/shared/shadcn/ui/checkbox'
import { ScrollArea } from '@/shared/shadcn/ui/scroll-area'
import { useState } from 'react'

export const TERMS_CONTENT = {
   title: '서비스 이용약관 및 개인정보처리방침',
   agreeTerms: '0RIGIN(제로리진) 이용약관에 동의합니다.',
   agreePrivacy: '개인정보 수집 및 이용에 동의합니다.',
   content: `제1조 (서비스의 목적)
 본 서비스는 회원에게 0RIGIN(제로리진)이 제공하는 다양한 콘텐츠 및 기능을 통한 창의적인 활동과 소통의 기회를 제공하기 위해 제공됩니다.
 
 회원은 0RIGIN(제로리진) 서비스를 통해 자신의 창작물을 공유하고 다른 회원들과 소통할 수 있습니다.
 
 제2조 (서비스의 변경 및 중단)
 0RIGIN(제로리진)은 필요한 경우 언제든지 서비스의 내용을 변경하거나 중단할 수 있습니다. 이 경우 0RIGIN(제로리진)은 해당 내용을 사전에 공지합니다.
 
 서비스의 변경이나 중단으로 인해 발생하는 불편이나 손실에 대해서 0RIGIN(제로리진)은 책임을 지지 않습니다.
 
 제3조 (회원의 의무 및 금지행위)
 회원은 본 서비스를 이용함에 있어서 다음 사항을 준수해야 합니다.
 
 • 다른 회원의 권리를 침해하지 않습니다.
 • 부적절한 콘텐츠를 업로드하거나 전파하지 않습니다.
 • 서비스의 안전성을 해치는 행위를 하지 않습니다.
 • 회원은 개인정보를 안전하게 보호하기 위해 비밀번호를 적절히 관리해야 합니다.
 
 다음 행위는 엄격히 금지됩니다:
 • 혐오 발언, 차별적 표현, 괴롭힘 또는 위협
 • 스팸, 무분별한 홍보, 상업적 광고
 • 타인의 개인정보 무단 수집 또는 공개
 • 불법적이거나 음란한 콘텐츠 게시
 • 저작권 침해 콘텐츠 업로드
 • 서비스 운영을 방해하는 행위
 
 제4조 (제재 및 처리 절차)
 회원이 본 약관을 위반할 경우, 0RIGIN(제로리진)은 다음과 같은 조치를 취할 수 있습니다:
 
 • 경고 및 콘텐츠 삭제
 • 일시적 서비스 이용 제한 (1일~30일)
 • 영구적 계정 정지
 • 법적 조치
 
 회원은 부당한 제재를 받았다고 판단되는 경우 이의제기를 할 수 있으며, 0RIGIN(제로리진)은 합리적인 기간 내에 검토 후 답변합니다.
 
 제5조 (콘텐츠 및 지적재산권)
 회원이 서비스에 업로드한 콘텐츠의 저작권은 해당 회원에게 있습니다.
 
 회원은 0RIGIN(제로리진)에 콘텐츠를 게시함으로써 서비스 운영 및 개선을 위한 제한적 사용권을 부여합니다.
 
 타인의 저작권을 침해하는 콘텐츠는 즉시 삭제되며, 반복적 침해 시 계정이 영구 정지될 수 있습니다.
 
 제6조 (개인정보 보호)
 0RIGIN(제로리진)은 개인정보보호법 등 관련 법령에 따라 회원의 개인정보를 보호합니다.
 
 수집하는 개인정보: 이메일, 닉네임, 프로필 정보
 이용 목적: 서비스 제공, 회원 관리, 커뮤니티 운영
 보유 기간: 회원 탈퇴 시까지 (법령에 따른 보존 의무 제외)
 
 회원은 언제든지 개인정보 열람, 수정, 삭제를 요청할 수 있습니다.
 
 제7조 (0RIGIN(제로리진)의 권리 및 의무)
 0RIGIN(제로리진)은 회원에게 안정적이고 원활한 서비스를 제공하기 위해 최선을 다하며, 서비스 개선을 위해 지속적으로 노력합니다.
 
 0RIGIN(제로리진)은 회원의 개인정보 보호를 위해 관련 법령 및 정책에 따라 노력합니다.
 
 제8조 (면책사항)
 0RIGIN(제로리진)은 천재지변, 시스템 장애 등 불가항력적 사유로 인한 서비스 중단에 대해 책임을 지지 않습니다.
 
 회원 간의 분쟁이나 회원이 게시한 콘텐츠로 인한 문제에 대해서는 해당 회원이 책임을 집니다.
 
 제9조 (약관의 효력 및 변경)
 본 약관은 회원가입과 동시에 효력을 발생합니다.
 
 약관 변경 시 최소 7일 전 공지하며, 중요한 변경사항은 30일 전 공지합니다.
 
 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.`,
}

interface StepTermsOfServiceProps {
   onAccept: () => void
}

export default function StepTermsOfService({
   onAccept,
}: StepTermsOfServiceProps) {
   // 이용약관 및 개인정보처리방침 동의 체크박스
   const [checkTerms, setCheckTerms] = useState<boolean>(false)
   const [checkPrivacy, setCheckPrivacy] = useState<boolean>(false)

   const handleAccept = (): void => {
      if (checkTerms && checkPrivacy) {
         onAccept()
      } else {
         alert('이용약관 및 개인정보처리방침에 모두 동의해주세요.')
      }
   }

   const allAgreed = checkTerms && checkPrivacy

   return (
      <section className="w-full sm:w-[400px] flex flex-col m-auto items-center mt-10 gap-2">
         <div className="space-y-2">
            <h2 className="font-bold text-lg">{TERMS_CONTENT.title}</h2>
            <ScrollArea className="h-80 w-full rounded-lg border">
               <div className="p-3">
                  <p className="mb-4 leading-6 whitespace-pre-line text-sm">
                     {TERMS_CONTENT.content}
                  </p>
               </div>
            </ScrollArea>
         </div>
         <div className="flex flex-col p-1 gap-3 w-full justify-start">
            <div className="flex items-center gap-2">
               <Checkbox
                  checked={checkTerms}
                  onCheckedChange={(checked) => {
                     setCheckTerms(!!checked)
                  }}
                  id="agree-terms"
               />
               <label htmlFor="agree-terms" className="text-sm">
                  {TERMS_CONTENT.agreeTerms}
               </label>
            </div>

            <div className="flex items-center gap-2">
               <Checkbox
                  checked={checkPrivacy}
                  onCheckedChange={(checked) => {
                     setCheckPrivacy(!!checked)
                  }}
                  id="agree-privacy"
               />
               <label htmlFor="agree-privacy" className="text-sm">
                  {TERMS_CONTENT.agreePrivacy}
               </label>
            </div>

            <div className="flex justify-center">
               <Button
                  className="px-16 py-4"
                  size="lg"
                  type="button"
                  onClick={handleAccept}
                  disabled={!allAgreed}
               >
                  확인
               </Button>
            </div>
         </div>
      </section>
   )
}
