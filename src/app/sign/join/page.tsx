import SignForm from '@/app/auth/_components/Sign/SignForm'
import { cookies } from 'next/headers'

export default function Page() {
   const cookieStore = cookies()
   const hasCookie = cookieStore.has('theme')
   return <SignForm />
}
