'use client'
import RadioList from '@/components/common/inputs/RadioList'
import InputValidator from './InputValidator'
import { GENDER_LIST } from '@/constants/auth/sign/signUp'
import BasicButton from '@/components/common/buttons/BasicButton'
import {
   passwordSchema,
   signUpSchema,
   userEmailSchema,
} from '@/schma/signFormSchema'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignForm() {
   const [error, setError] = useState('')
   const { push } = useRouter()
   const handleSignUpSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const formObject = Object.fromEntries(formData)
      const result = signUpSchema.safeParse(formObject)
      const newErrors = []
      if (result.success === false) {
         result.error.errors.forEach((error) => {
            console.log(error)
            newErrors.push(error.message)
         })
         setError(newErrors.join(', '))
         return
      }
      console.log('formObject', formObject)
      const fetchResult = await fetch('/api/signup', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(formObject),
      })
      const { success, message } = await fetchResult.json()
      if (success) {
         console.log(message)
         return push('/')
      }
      setError(message)
   }

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
               <RadioList arr={GENDER_LIST} />
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
