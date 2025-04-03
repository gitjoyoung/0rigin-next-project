'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { LoadingSpinner } from '@/shared/ui/spinner/loading-spinner'
import { useUserSignUp } from '../hook/useUserSignUp'
import { passwordSchema, userEmailSchema } from '../type/schema'
import GenderRadioButton from './gender-radio-button'
import InputValidator from './input-validator'

export default function SignForm() {
   const { error, handleSignUpSubmit, isLoading } = useUserSignUp()
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
                  <GenderRadioButton disabled={isLoading} />
                  <div className="flex flex-col py-2 gap-2">
                     <InputValidator
                        disabled={isLoading}
                        placeholder={'이메일을 입력하세요'}
                        name="email"
                        type="email"
                        validate={userEmailSchema}
                     />
                     <InputValidator
                        disabled={isLoading}
                        placeholder={'비밀번호를 입력하세요'}
                        name="password"
                        type="password"
                        validate={passwordSchema}
                     />
                     <InputValidator
                        disabled={isLoading}
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
                  </div>
                  <Button disabled={isLoading} type="submit" className="w-full">
                     {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                           <LoadingSpinner className="h-4 w-4" />
                           <span>처리중...</span>
                        </div>
                     ) : (
                        '회원가입'
                     )}
                  </Button>
               </form>
            </CardContent>
         </Card>
      </section>
   )
}
