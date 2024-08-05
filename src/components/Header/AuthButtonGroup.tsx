import AuthAfterButtonGroup from './AuthAfterButtonGroup'
import { auth } from '@/auth'
import AuthBeforeButtonGroup from './AuthBeforeButtonGroup'

export default async function AuthButtonGroup() {
   const session = await auth()
   return (
      <section className="flex items-end gap-5">
         {!session?.user.email ? (
            <AuthBeforeButtonGroup />
         ) : (
            <AuthAfterButtonGroup />
         )}
      </section>
   )
}
