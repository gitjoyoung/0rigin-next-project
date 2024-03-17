import { SIGN_UP_TERMS } from '@/constants/auth/signUpTermsText'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 회원가입 약관',
}

function SignPage() {
   return (
      //  회원가입 이동 페이지
      <div className="mt-20 mb-20 h-full w-full pr-10 pl-10 flex flex-col items-center gap-5 justify-center">
         <h1 className="font-bold text-3xl">{SIGN_UP_TERMS.welcomeMessage}</h1>
         <h3>{SIGN_UP_TERMS.registration.question}</h3>
         <div className="flex gap-8 items-center">
            <Link href={SIGN_UP_TERMS.login.href}>
               <button type="button" className="p-2">
                  {SIGN_UP_TERMS.login.buttonText}
               </button>
            </Link>
            <Link href={SIGN_UP_TERMS.signup.href}>
               <button type="button" className="p-2 font-semibold">
                  {SIGN_UP_TERMS.signup.buttonText}
               </button>
            </Link>
         </div>
      </div>
   )
}

export default SignPage
