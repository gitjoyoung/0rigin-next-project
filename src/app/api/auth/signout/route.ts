import { signOut } from '@/entities/auth/api/sign-out'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const result = await signOut()

   return NextResponse.json(result)
}
