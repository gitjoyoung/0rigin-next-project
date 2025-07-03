'use client'

import { useState } from 'react'
import GoogleProfileForm from './google-profile-form'
import NormalSignUpForm from './normal-signup-form'
import SignUpProgressHeader from './signup-progress-header'
import StepTermsOfService from './step-terms-of-service'

interface SignUpFlowProps {
   email?: string
}

export default function SignUpFlow({ email }: SignUpFlowProps) {
   const [isTermsAccepted, setIsTermsAccepted] = useState(false)
   const secondStepLabel = email ? '프로필 생성' : '회원가입'

   // 1. 약관 동의가 안 된 경우
   if (!isTermsAccepted) {
      return (
         <div className="w-full">
            <SignUpProgressHeader
               isTermsAccepted={false}
               secondStepLabel={secondStepLabel}
            />
            <StepTermsOfService onAccept={() => setIsTermsAccepted(true)} />
         </div>
      )
   }

   // 2. 약관 동의가 된 경우
   return (
      <div className="w-full">
         <SignUpProgressHeader
            isTermsAccepted={true}
            secondStepLabel={secondStepLabel}
         />
         {email ? <GoogleProfileForm email={email} /> : <NormalSignUpForm />}
      </div>
   )
}
