import { ROUTE_LOGIN } from '@/constants/pathname'
import { getUserServer } from '@/entities/auth/api/get-user'
import { redirect } from 'next/navigation'
import SignForm from './ui'

export default async function SignFormPage() {
   const user = await getUserServer()

   if (!user) {
      redirect(ROUTE_LOGIN)
   }

   return <SignForm email={user.email} />
}
