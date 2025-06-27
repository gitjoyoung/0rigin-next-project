import type { Metadata } from 'next'
import MyPage from './ui'
export const metadata: Metadata = {
   title: 'Origin 마이페이지',
   description: 'Origin 마이페이지',
}
export default async function page() {
   return <MyPage />
}
