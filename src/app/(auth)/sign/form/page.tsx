import { ROUTE_LOGIN } from '@/constants/pathname'
import { getUser } from '@/entities/auth/api/get-user'
import { redirect } from 'next/navigation'
import SignForm from './ui'

export default async function SignFormPage() {
   const user = await getUser()

   if (!user) {
      redirect(ROUTE_LOGIN)
   }

   return <SignForm email={user.email} />
}
