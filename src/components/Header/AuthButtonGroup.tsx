import React from 'react'
import AuthSignUp from './AuthSignUp'
import AuthButton from './AuthButton'
import MobileAlramButton from './Mobile/MobileAlramButton'
import MobileMenuButton from './Mobile/MobileMenuButton'

export default function AuthButtonGroup() {
   return (
      <div>
         {' '}
         <div className="hidden md:flex ">
            <AuthSignUp />
            <AuthButton />
         </div>
         <div className="md:hidden flex gap-3 items-center mx-1">
            <MobileAlramButton />
            <MobileMenuButton />
         </div>
      </div>
   )
}
