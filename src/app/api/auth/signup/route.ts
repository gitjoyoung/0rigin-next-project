import { signUp } from '@/entities/auth/api/sign-up'
import { decryptObject } from '@/shared/utils/crypto-helper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   console.log('회원가입 API 호출됨')

   const body = await request.json().catch(() => ({}))
   // 복호화
   const decryptedBody = decryptObject(body)

   const result = await signUp(decryptedBody)

   return NextResponse.json(result)
}
