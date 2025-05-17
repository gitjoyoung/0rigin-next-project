import { SignUpParamsSchema } from '@/entities/auth/types/sign-up'
import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   // 1. 요청 바디 파싱
   const body = await request.json().catch(() => ({}))

   // 2. 유효성 검사
   const result = SignUpParamsSchema.safeParse(body)
   if (!result.success) {
      return NextResponse.json(
         {
            success: false,
            message:
               result.error.errors[0]?.message ||
               '입력 정보가 올바르지 않습니다.',
            errors: result.error.errors,
         },
         { status: 400 },
      )
   }

   // 3. 회원가입 처리
   const validatedData = result.data
   const supabase = await SupabaseServerClient()
   const { error } = await supabase.auth.signUp({
      email: validatedData.email,
      password: validatedData.password,
      options: {
         data: {
            nickname: validatedData.nickname,
            gender: validatedData.gender,
            signup_complete: true,
         },
      },
   })

   // 4. 결과 반환
   if (error) {
      return NextResponse.json(
         { success: false, message: error.message },
         { status: 400 },
      )
   }

   return NextResponse.json(
      { success: true, message: '회원가입 성공' },
      { status: 201 },
   )
}
