'use client'

import React from 'react'
import { useFormStatus } from 'react-dom'

export default function FormSubmitButton({ label }) {
   //  useFormStatus 폼의 상태를 가져온다
   // pending, data, method, action 등의 상태를 가져올 수 있다
   // pending는 현재 폼이 서버에 요청을 보내고 있는지 여부를 나타낸다
   // pending가 true이면 서버에 요청을 보내고 있는 중이다
   // pending가 false이면 서버에 요청을 보내고 있지 않다
   // pending가 true이면 버튼을 비활성화한다
   const { pending } = useFormStatus()
   return (
      <button type="submit" className="p-3 " disabled={pending}>
         {label}
      </button>
   )
}
