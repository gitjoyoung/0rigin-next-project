import AuthSignUp from './AuthSignUp'
import AuthButton from './AuthButton'
import MobileAlramButton from './Mobile/MobileAlramButton'
import MobileMenuButton from './Mobile/MobileMenuButton'
import { auth } from '@/auth'

export default async function AuthButtonGroup() {
   const session = await auth()
   console.log('session', session)
   return (
      <div>
         <div className="hidden md:flex ">
            {!session ? (
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
