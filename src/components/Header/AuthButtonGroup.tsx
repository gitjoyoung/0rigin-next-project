'use client'

import AuthSignUp from './AuthSignUp'
import AuthButton from './AuthButton'
import MobileAlramButton from './Mobile/MobileAlramButton'
import MobileMenuButton from './Mobile/MobileMenuButton'
import { useState } from 'react'

export default function AuthButtonGroup() {
   const [isLogin, setIsLogin] = useState(true)
   return (
      <div>
         <div className="hidden md:flex ">
            {isLogin ? (
               <>
                  <AuthSignUp />
               </>
            ) : (
               <>
                  <AuthButton />
               </>
            )}
         </div>
         <div className="md:hidden flex gap-3 items-center mx-1">
            <MobileAlramButton />
            <MobileMenuButton />
         </div>
      </div>
   )
}
