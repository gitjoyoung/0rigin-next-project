import { signIn } from '@/entities/auth/api/sign-in'
import { decryptObject } from '@/shared/utils/crypto-helper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   // 1. 요청 바디 파싱
   const body = await request.json().catch(() => ({}))

   const decryptedBody = decryptObject(body)
   const result = await signIn(
      decryptedBody as { password: string; email: string },
   )

   // 5. 성공 응답
   return NextResponse.json(result)
}
