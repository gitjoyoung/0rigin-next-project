'use client'

import MyPage from '@/components/Mypage/MyPage'
import { getServerSession } from 'next-auth'

export default function page() {

   return <MyPage /> // 페이지 컴포넌트
}
