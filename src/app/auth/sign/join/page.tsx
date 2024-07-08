import { cookies } from 'next/headers'
import SignForm from '../../_components/Sign/SignForm'

export default function Page() {
   const cookieStore = cookies()
   const hasCookie = cookieStore.has('theme')
   return <SignForm />
}
