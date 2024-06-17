'use client'

import { ROUTES } from '@/constants/route'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, FormEvent } from 'react'
import InputAndCheck from '../Sign/InputValidator'
import { loginFormSchema } from '../../../schma/loginFormSchema'

export default function Login() {
   const { push } = useRouter()
   // 로그인 form 정보
   const [error, setError] = useState<string>('')

   /**
    * 폼 제출 함수
    * @param e
    * @returns
    */
   const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const formData = {
         email: e.currentTarget.email.value,
         password: e.currentTarget.password.value,
      }
      const result = loginFormSchema.safeParse(formData)
      if (result.success === false) {
         setError('아이디 또는 비밀번호 양식에 맞지 않습니다.')
         return
      }

      const response = await signIn('credentials', {
         redirect: false,
         ...formData,
      })
      if (response && response.status === 200) {
         push(ROUTES.HOME)
      } else {
         setError('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
   }

   return (
      <section className=" w-full  flex justify-center ">
         <div className="border p-10 flex justify-center items-center flex-col gap-6 m-3  w-full max-w-[500px] min-h-[500px]">
            <div>
               <h1 className="font-bold  text-2xl ">로그인</h1>
            </div>
            <form className="flex flex-col gap-3" onSubmit={handleLoginSubmit}>
               <InputAndCheck placeholder="아이디" name="email" type="text" />
               <InputAndCheck
                  placeholder="비밀번호"
                  name="password"
                  type="password"
               />
               <p className="text-xs text-red-500 overflow-auto">
                  {error || ' '}
               </p>
               <button type="submit" className="mt-3 p-2">
                  로그인
               </button>
            </form>

            <div className=" text-sm flex gap-5 ">
               <Link className="border p-2" href={ROUTES.SIGN}>
                  회원가입
               </Link>
               <Link className="border p-2" href={ROUTES.FORGET}>
                  비밀번호 분실
               </Link>
            </div>
         </div>
      </section>
   )
}
