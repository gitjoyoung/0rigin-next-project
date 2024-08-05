'use client'
import { ROUTES } from '@/constants/route'
import { signInWithCredentials } from '@/serverAction/auth'
import Link from 'next/link'
import { useState } from 'react'
import { useFormState } from 'react-dom'

export default function Login() {
   const [error, setError] = useState('')
   const [pending, setPending] = useState(false)


   return (
      <section className=" w-full h-full my-auto flex justify-center items-center">
         <div className="flex flex-col h-full border p-10  justify-center items-center gap-6 m-3 rounded-xl">
            {/* 타이틀 */}
            <div>
               <h1 className="font-bold  text-2xl ">로그인</h1>
            </div>
            {/* 입력폼 */}
            <form
               className="flex flex-col gap-3"
               action={signInWithCredentials}
            >
               <input
                  className="border p-2"
                  type="email"
                  name="email"
                  placeholder="이메일"
               />
               <input
                  className="border p-2"
                  type="password"
                  name="password"
                  placeholder="비밀번호"
               />
               <p className="text-xs text-red-500 overflow-auto">{error}</p>
               <button type="submit" className="mt-3 p-2" disabled={pending}>
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
