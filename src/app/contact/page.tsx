import Contact from '@/components/Contact/Contact'
import { Metadata } from 'next'

export const metadata: Metadata = {
   title: '0rigin 연락하기',
}
export default function page() {
   return <Contact />
}
