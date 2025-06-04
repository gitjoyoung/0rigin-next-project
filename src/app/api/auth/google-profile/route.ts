import {
   createGoogleProfile,
   type GoogleProfileParams,
} from '@/entities/auth/api/google-profile'
import { decryptObject } from '@/shared/utils/crypto-helper'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const body = await request.json().catch(() => ({}))
   const decryptedBody = decryptObject(body) as GoogleProfileParams

   const result = await createGoogleProfile({
      nickname: decryptedBody.nickname,
      gender: decryptedBody.gender,
   })

   return NextResponse.json(result)
}
