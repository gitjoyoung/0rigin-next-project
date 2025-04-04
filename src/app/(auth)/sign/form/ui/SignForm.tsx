'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { useUserSignUp } from '../hook/useUserSignUp'
import { passwordSchema, userEmailSchema } from '../type/schema'
import GenderRadioButton from './GenderRadioButton'
import InputValidator from './InputValidator'

export default function SignForm() {
   const { error, handleSignUpSubmit } = useUserSignUp()
   return (
      <section className="w-full flex justify-center">
         <Card className="w-full max-w-[350px]">
            <CardHeader>
               <CardTitle className="text-2xl">0rigin 회원가입</CardTitle>
               <CardDescription className="text-transparent">
                  자유 의지가 존재할까요?
               </CardDescription>
            </CardHeader>
            <CardContent>
               <form
                  onSubmit={handleSignUpSubmit}
                  className="flex flex-col gap-3 w-full"
               >
                  <GenderRadioButton />
                  <InputValidator
                     placeholder={'이메일을 입력하세요'}
                     name="email"
                     type="email"
                     validate={userEmailSchema}
                  />
                  <InputValidator
                     placeholder={'비밀번호를 입력하세요'}
                     name="password"
                     type="password"
                     validate={passwordSchema}
                  />
                  <InputValidator
                     placeholder={'비밀번호 재확인'}
                     name="confirmPassword"
                     type="password"
                     validate={passwordSchema}
                  />
                  {error && (
                     <p className="text-xs text-red-500 whitespace-pre-line font-medium">
                        {error}
                     </p>
                  )}
                  <Button type="submit" className="w-full">
                     회원가입
                  </Button>
               </form>
            </CardContent>
         </Card>
      </section>
   )
}
