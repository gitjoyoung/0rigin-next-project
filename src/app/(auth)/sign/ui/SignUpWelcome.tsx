import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'
import { SIGN_UP_TERMS } from '../model/constants/terms'

export default function SignUpWelcome() {
   return (
      <div className="w-full  h-full flex flex-col items-center gap-5 justify-center">
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
