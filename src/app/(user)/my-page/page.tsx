import type { Metadata } from 'next'
import MyPage from './ui'
export const metadata: Metadata = {
   title: '마이페이지',
   description: 'business contact page',
}
export default async function page() {
   return <MyPage />
}
