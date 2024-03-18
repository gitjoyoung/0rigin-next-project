'use client'

import React, { useState } from 'react'
import TermsOfService from './TermsOfService'
import SignForm from './SignForm'

export default function SignContent() {
   const [changePage, setChangePage] = useState(false)

   const handleAcceptTerms = (): void => {
      setChangePage(true)
   }
   if (changePage) {
      return <SignForm />
   }
   return <TermsOfService onTermsAgreed={handleAcceptTerms} />
}
