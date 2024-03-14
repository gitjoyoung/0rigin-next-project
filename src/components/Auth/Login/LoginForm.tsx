import { ROUTES } from '@/constants/route'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState, FormEvent, ChangeEvent } from 'react'

export default function Login() {
   const router = useRouter()

   // 로그인 form 정보
   const [id, setId] = useState<string>('')
   const [password, setPassword] = useState<string>('')
   const [error, setError] = useState<string>('')

   /**
    * 폼 제출 함수
    * @param e
    * @returns
    */
   const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const credentials = {
         id,
         password,
      }

      const response = await signIn('credentials', {
         redirect: false,
         ...credentials,
      })
      if (response && response.status === 200) {
         router.push(ROUTES.HOME)
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
               <input
                  key="id"
                  type="text"
                  placeholder="ID"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                     setId(e.target.value)
                     setError('')
                  }}
                  className={`border  p-2 `}
               />
               <input
                  key="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
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
