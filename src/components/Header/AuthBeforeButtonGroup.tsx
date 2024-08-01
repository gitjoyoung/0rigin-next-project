'use client'
import { ROUTES } from '@/constants/route'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function AuthBeforeButtonGroup() {
   const { push } = useRouter()
   return (
      <div className="flex gap-2 text-xs">
         <button
            type="button"
            onClick={() => push(ROUTES.LOGIN)}
            className="btn-login"
         >
            로그인
         </button>
         <button
            type="button"
            onClick={() => push(ROUTES.SIGN)}
            className="btn-sighup"
         >
            회원가입
         </button>
      </div>
   )
}
