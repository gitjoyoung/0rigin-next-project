// src/app/(auth)/callback/route.ts
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { redirect } from 'next/navigation'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
   const supabase = await SupabaseServerClient()
   // ① code ↔ session 교환
   const { searchParams } = new URL(req.url)
   const code = searchParams.get('code')
   if (!code) return redirect('/')

   await supabase.auth.exchangeCodeForSession(code)

   // ② 프로필 검증 등 필요한 로직
   const {
      data: { user },
   } = await supabase.auth.getUser()
   if (!user) return redirect('/')

   // ③ 쿠키가 자동으로 Set-Cookie 되어 브라우저에 저장됨
   return NextResponse.redirect(new URL('/', req.url))
}
