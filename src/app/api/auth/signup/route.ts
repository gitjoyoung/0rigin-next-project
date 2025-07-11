import { signUp } from '@/entities/auth/api/sign-up'
import { decryptObject } from '@/shared/utils/crypto-helper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const body = await request.json().catch(() => ({}))
   const decryptedBody = decryptObject(body)
   const result = await signUp(decryptedBody)
   return NextResponse.json(result)
}
