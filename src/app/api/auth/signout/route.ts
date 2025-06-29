import { signOut } from '@/entities/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const result = await signOut()

   return NextResponse.json(result)
}
