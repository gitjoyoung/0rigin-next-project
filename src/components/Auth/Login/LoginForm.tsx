'use client'

import fetchLogin from '@/app/api/auth/login'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
   const router = useRouter()

   const [id, setId] = useState('')
   const [password, setPassword] = useState('')
   const [error, setError] = useState('')

   /**
    * 폼 제출 함수
    * @param e
    * @returns
    */
   const handleLoginSubmit = async (e) => {
      e.preventDefault()

      const response = await fetchLogin(id, password)
      if (response > 0) {
         router.push('/')
      } else {
         setError('아이디 또는 비밀번호가 일치하지 않습니다.')
      }
   }

   return (
      <section className=" w-full  flex justify-center  ">
         <div className="border p-10 flex justify-center items-center flex-col gap-6 m-3  w-full max-w-[500px] min-h-[500px]">
            <div>
               <h1 className="font-bold  text-2xl ">로그인</h1>
            </div>

            <form className="flex flex-col gap-3" onSubmit={handleLoginSubmit}>
               <input
                  name="id"
                  key="id"
                  type="text"
                  placeholder="ID"
                  onChange={(e) => {
                     setId(e.target.value)
                     setError('')
                  }}
                  className={`border  p-2 `}
               />
               <input
                  name="password"
                  key="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => {
                     setPassword(e.target.value)
                     setError('')
                  }}
                  className={`border  p-2 `}
               />
               <p className="text-xs text-red-500 overflow-auto">
                  {error || ' '}
               </p>
               <button type="submit" className="mt-3 p-2">
                  로그인
               </button>
            </form>
            <div className=" text-sm flex gap-5  ">
               <Link href="/login/forget">아이디 분실</Link>
               <Link href="/login/forget">비밀번호 분실</Link>
            </div>
         </div>
      </section>
   )
}
