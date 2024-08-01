'use client'
import RadioList from '@/components/common/inputs/RadioList'
import InputValidator from './InputValidator'
import { GENDER_LIST, INPUT_LIST } from '@/constants/auth/sign/signUp'
import { v4 } from 'uuid'
import BasicButton from '@/components/common/buttons/BasicButton'
import { signUpSchema } from '@/schma/signFormSchema'

export default function SignForm() {
   const handleSignUpSubmit = async (e) => {
      e.preventDefault()
      const formData = new FormData(e.target)
      const formObject = Object.fromEntries(formData)
      const result = signUpSchema.safeParse(formObject)
      console.log('result :', result, result.error)
      if (result.success === false) {
         return
      }
   }
   return (
      <section className="w-full flex justify-center">
         <div className="border p-10 flex items-center rounded-md flex-col gap-6 m-3 w-full max-w-[350px]">
            <h1 className="font-bold text-2xl">0rigin 회원가입</h1>
            <dfn className="text-transparent ">자유 의지가 존재할까요?</dfn>
            <form
               onSubmit={handleSignUpSubmit}
               className="flex flex-col gap-3 w-full max-w-[300px]"
            >
               <RadioList arr={GENDER_LIST} />

               {INPUT_LIST.map((input) => (
                  <InputValidator
                     key={v4()}
                     placeholder={input.placeholder}
                     name={input.name}
                     errorMsg={input.errorMsg}
                     type={input.type}
                     validate={input.validate}
                  />
               ))}
               <BasicButton text="회원가입" type="submit" />
            </form>
         </div>
      </section>
   )
}
