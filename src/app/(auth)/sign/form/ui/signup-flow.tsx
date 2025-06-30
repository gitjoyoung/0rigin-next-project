'use client'

import type { User } from '@supabase/supabase-js'
import { useState } from 'react'
import GoogleProfileForm from './google-profile-form'
import NormalSignUpForm from './normal-signup-form'
import SignUpProgressHeader from './signup-progress-header'
import StepTermsOfService from './step-terms-of-service'

interface SignUpFlowProps {
   user?: User
}

export default function SignUpFlow({ user }: SignUpFlowProps) {
   const [isTermsAccepted, setIsTermsAccepted] = useState(false)
   const secondStepLabel = user && user.email ? '프로필 생성' : '회원가입'

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
         {user && user.email ? (
            <GoogleProfileForm email={user.email} />
         ) : (
            <NormalSignUpForm />
         )}
      </div>
   )
}
