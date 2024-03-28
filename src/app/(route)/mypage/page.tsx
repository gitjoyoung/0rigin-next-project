'use client'

import { options } from '@/app/api/auth/[...nextauth]/options'
import MyPage from '@/components/Mypage/MyPage'
import { getServerSession } from 'next-auth'

export default function page() {
   const session = getServerSession(options)

   console.log(session)

   return <MyPage /> // 페이지 컴포넌트
}
