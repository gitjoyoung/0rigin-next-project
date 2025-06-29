import { checkSignupCompleteServer } from '@/entities/auth'
import { NextResponse } from 'next/server'

export async function GET() {
   try {
      const isSignupComplete = await checkSignupCompleteServer()

      return NextResponse.json({ isSignupComplete })
   } catch (error) {
      console.error('회원가입 상태 확인 실패:', error)
      return NextResponse.json(
         { error: '회원가입 상태를 확인할 수 없습니다.' },
         { status: 500 },
      )
   }
}
