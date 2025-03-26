'use client'

import BasicButton from '@/components/common/buttons/BasicButton'
import { passwordSchema, userEmailSchema } from '@/schema/signFormSchema'
import { useUserSignUp } from '../hook/useUserSignUp'
import GenderRadioButton from './GenderRadioButton'
import InputValidator from './InputValidator'

export default function SignForm() {
   const { error, handleSignUpSubmit } = useUserSignUp()
   return (
      <section className="w-full flex justify-center">
         <div className="border p-10 flex items-center rounded-md flex-col gap-3 m-3 w-full max-w-[350px]">
            <h1 className="font-bold text-2xl">0rigin 회원가입</h1>
            <dfn className="text-transparent text-sm">
               자유 의지가 존재할까요?
            </dfn>
            <form
               onSubmit={handleSignUpSubmit}
               className="flex flex-col gap-3 w-full max-w-[300px]"
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
               {error && <p className="text-xs text-red-500">{error}</p>}
               <BasicButton text="회원가입" type="submit" />
            </form>
         </div>
      </section>
   )
}
