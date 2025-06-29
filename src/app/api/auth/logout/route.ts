// src/app/api/logout/route.ts
import { signOut } from '@/entities/auth'
import { NextResponse } from 'next/server'

const getSupabaseProjectRef = () => {
   const url = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
   return url.split('//')[1]?.split('.')[0] || ''
}

export async function POST() {
   const result = await signOut()

   if (!result.success) {
      return NextResponse.json(
         { success: false, message: result.message },
         { status: 400 },
      )
   }

   const projectRef = getSupabaseProjectRef()
   const response = NextResponse.json(result, { status: 200 })

   // 응답 헤더에 쿠키 삭제 지시 추가
   response.cookies.delete('sb-access-token')
   response.cookies.delete('sb-refresh-token')
   response.cookies.delete(`sb-${projectRef}-auth-token.1`)

   return response
}
