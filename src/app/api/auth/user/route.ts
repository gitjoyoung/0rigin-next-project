import { getUser } from '@/entities/auth/api/get-user'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const user = await getUser()

      return NextResponse.json({ user })
   } catch (error) {
      console.error('사용자 정보 조회 실패:', error)
      return NextResponse.json(
         { error: '사용자 정보를 가져올 수 없습니다.' },
         { status: 500 },
      )
   }
}
