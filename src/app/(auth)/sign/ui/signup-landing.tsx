import { ROUTE_LOGIN, ROUTE_SIGN_FORM } from '@/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'
const SIGN_UP_TERMS = {
   welcomeMessage: `0RIGIN(제로리진) 커뮤니티에 오신 것을 환영합니다! `,
   registration: {
      question: '자신의 내면과 우주의 무한함을 탐험할 준비가 되셨나요?',
      alreadyMemberMessage: '이미 회원이신가요? 로그인 하기',
   },
   login: {
      href: ROUTE_LOGIN,
      buttonText: '이미 회원입니다.',
   },
   signup: {
      href: ROUTE_SIGN_FORM,
      buttonText: '회원가입',
   },
}
export default function SignUpLanding() {
   return (
      <div className="w-full h-full flex flex-col items-center gap-5 justify-center px-2">
         <h1 className="font-bold text-3xl text-center px-4 whitespace-pre-line leading-relaxed">
            {SIGN_UP_TERMS.welcomeMessage}
         </h1>
         <h3>{SIGN_UP_TERMS.registration.question}</h3>
         <div className="flex gap-8 items-center">
            <Link href={SIGN_UP_TERMS.login.href}>
               <Button type="button" variant="link">
                  <p className="truncate">{SIGN_UP_TERMS.login.buttonText}</p>
               </Button>
            </Link>
            <Link href={SIGN_UP_TERMS.signup.href}>
               <Button type="button" variant="link">
                  <p className="truncate font-bold text-lg">
                     {SIGN_UP_TERMS.signup.buttonText}
                  </p>
               </Button>
            </Link>
         </div>
      </div>
   )
}
