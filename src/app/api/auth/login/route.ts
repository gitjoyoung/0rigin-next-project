import { signIn } from '@/entities/auth'
import { LoginParamsSchema } from '@/entities/auth/types/login'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   // 1. 요청 바디 파싱
   const body = await request.json().catch(() => ({}))

   // 2. 유효성 검사
   const result = LoginParamsSchema.safeParse(body)
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

   // 3. 로그인 처리
   const validatedData = result.data
   const signInResult = await signIn({
      email: validatedData.email,
      password: validatedData.password,
   })

   // 4. 결과에 따른 적절한 상태 코드 반환
   if (!signInResult.success) {
      return NextResponse.json(
         signInResult,
         { status: 401 }, // 인증 실패
      )
   }

   // 5. 성공 응답
   return NextResponse.json(signInResult, { status: 200 })
}
