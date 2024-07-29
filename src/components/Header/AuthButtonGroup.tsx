import AuthSignUp from './AuthSignUp'
import AuthButton from './AuthButton'
import MobileAlramButton from './Mobile/MobileAlramButton'
import MobileMenuButton from './Mobile/MobileMenuButton'
import { auth } from '@/auth'

export default async function AuthButtonGroup() {
   const session = await auth()
   const { email } = session
   console.log(session)
   return (
      <div>
         <div className="hidden md:flex ">
            {!session.uid ? (
               <>
                  <AuthSignUp />
               </>
            ) : (
               <>
                  <AuthButton email={email} />
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
