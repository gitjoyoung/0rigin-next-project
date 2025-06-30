import type { Metadata } from 'next'
import MyPage from './ui'
export const metadata: Metadata = {
   title: '마이페이지',
   description: '0RIGIN(제로리진) 마이페이지',
}
export default async function page() {
   return <MyPage />
}
