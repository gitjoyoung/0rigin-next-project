// src/app/(auth)/callback/route.ts
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { type NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
   const { searchParams, origin } = new URL(request.url)
   const code = searchParams.get('code')
   let next = searchParams.get('next') ?? '/'
   if (!next.startsWith('/')) next = '/'

   if (code) {
      const supabase = await SupabaseServerClient()

      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (!error) {
         // ② 프로필 검증 등 필요한 로직
         const {
            data: { user },
         } = await supabase.auth.getUser()

         if (user) {
            const forwardedHost = request.headers.get('x-forwarded-host')
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) return NextResponse.redirect(`${origin}${next}?`)
            if (forwardedHost)
               return NextResponse.redirect(`https://${forwardedHost}${next}`)
            return NextResponse.redirect(`${origin}${next}`)
         }
      }
   }

   throw new Error('Failed to exchange code for session')
}
