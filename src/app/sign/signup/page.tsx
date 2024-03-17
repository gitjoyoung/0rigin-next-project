'use client'

import Sign from '@/components/Auth/Sign/SignForm'
import TermsOfService from '@/components/Auth/Sign/TermsOfService'
import { useState } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 회원가입',
}

export default function Page() {
   // 회원가입 페이지로 이동 여부
   const [changePage, setChangePage] = useState(false)

   /**
    * 이용약관 동의 후 회원가입 페이지로 이동
    * @returns {void}
    */
   const handleAcceptTerms = (): void => {
      setChangePage(true)
   }
   if (changePage) {
      return <Sign />
   }
   return <TermsOfService onTermsAgreed={handleAcceptTerms} />
}
