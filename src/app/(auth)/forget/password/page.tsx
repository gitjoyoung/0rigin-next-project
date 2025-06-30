import type { Metadata } from 'next'
import ForgetForm from './ui/forget-form'

export const metadata: Metadata = {
   title: '비밀번호 찾기',
   description: '0RIGIN(제로리진) 비밀번호 찾기 페이지입니다.',
}

export default function page() {
   return (
      <div className="flex justify-center items-center flex-col px-1">
         <div className="text-center space-y-2 mb-8 mt-10">
            <h2 className="text-3xl font-bold tracking-tight">비밀번호 찾기</h2>
            <p className="text-muted-foreground text-sm">
               가입하신 이메일 주소를 입력하시면, 비밀번호 재설정 링크를
               보내드립니다.
            </p>
         </div>
         <ForgetForm />
      </div>
   )
}
