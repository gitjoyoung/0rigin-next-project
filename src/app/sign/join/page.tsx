import { cookies } from 'next/headers'
import SignForm from '@/components/Auth/Sign/SignForm'

export default function Page() {
   const cookieStore = cookies()
   const hasCookie = cookieStore.has('theme')
   return <SignForm />
}
