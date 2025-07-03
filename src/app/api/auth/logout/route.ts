// src/app/api/logout/route.ts
import { signOut } from '@/entities/auth/api/sign-out'
import { NextResponse } from 'next/server'

export async function POST() {
   await signOut()

   const response = NextResponse.json({ success: true }, { status: 200 })

   // 응답 헤더에 쿠키 삭제 지시 추가
   response.cookies.delete('sb-access-token')
   response.cookies.delete('sb-refresh-token')

   return response
}
