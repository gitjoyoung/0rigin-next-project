import type { Metadata } from 'next'
import InquiryForm from './ui/InquiryForm'
export const dynamic = 'force-static'

export const metadata: Metadata = {
   title: '문의하기',
   description: '0RIGIN(제로리진)에 궁금한 점이나 건의사항을 문의해 주세요.',
}

export default function page() {
   return (
      <div className="w-full">
         <InquiryForm />
      </div>
   )
}
