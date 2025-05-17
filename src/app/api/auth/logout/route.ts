import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   // 로그아웃 처리
   const supabase = await SupabaseServerClient()
   const { error } = await supabase.auth.signOut()

   // 결과 반환
   if (error) {
      return NextResponse.json(
         { success: false, message: error.message },
         { status: 500 },
      )
   }

   return NextResponse.json(
      { success: true, message: '로그아웃 성공' },
      { status: 200 },
   )
}
