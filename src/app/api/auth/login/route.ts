import { signIn } from '@/entities/auth'
import { decryptObject } from '@/shared/utils/crypto-helper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   // 1. 요청 바디 파싱
   const body = await request.json().catch(() => ({}))

   const decryptedBody = decryptObject(body)

   // 2. 유효성 검사
   const result = await signIn(decryptedBody)

   // 5. 성공 응답
   return NextResponse.json(result)
}
