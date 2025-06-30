import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
   const requestUrl = new URL(request.url)
   const code = requestUrl.searchParams.get('code')
   const error = requestUrl.searchParams.get('error')

   // OAuth 에러 처리
   if (error) {
      return NextResponse.redirect(
         new URL('/login?error=' + encodeURIComponent(error), request.url),
      )
   }

   // 코드 없으면 로그인으로
   if (!code) {
      return NextResponse.redirect(new URL('/login', request.url))
   }

   const supabase = await SupabaseServerClient()

   // 세션 교환
   const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code)

   if (exchangeError || !data.user) {
      return NextResponse.redirect(
         new URL(
            '/login?error=' + encodeURIComponent('로그인 처리에 실패했습니다.'),
            request.url,
         ),
      )
   }

   // 프로필 직접 확인 (API 호출 대신)
   try {
      const { data: profile, error: profileError } = await supabase
         .from('profile')
         .select('id')
         .eq('id', data.user.id)
         .single()

      // 프로필 있음 - 홈으로
      if (profile && !profileError) {
         return NextResponse.redirect(new URL('/', request.url))
      }

      // 프로필 없음 - 신규 회원이므로 회원가입 페이지로
      return NextResponse.redirect(new URL('/sign/form', request.url))
   } catch (error) {
      // 프로필 확인 실패 - 로그아웃 후 로그인 페이지로
      console.error('프로필 확인 중 오류:', error)
      await supabase.auth.signOut()
      return NextResponse.redirect(
         new URL(
            '/login?error=' +
               encodeURIComponent('프로필 확인 중 오류가 발생했습니다.'),
            request.url,
         ),
      )
   }
}
