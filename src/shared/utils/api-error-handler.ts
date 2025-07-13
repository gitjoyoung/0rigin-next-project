import { NextResponse } from 'next/server'

// 에러 로그 기록과 응답 생성을 위한 공통 유틸리티
export const handleApiError = (
   error: unknown,
   context: string,
   defaultMessage: string = '서버 오류가 발생했습니다.',
   status: number = 500,
) => {
   // 에러 로그 기록
   console.error(`${context} 에러:`, error)

   // 에러 메시지 추출
   const errorMessage = error instanceof Error ? error.message : defaultMessage

   return NextResponse.json({ error: errorMessage }, { status })
}

// 404 에러 응답 생성 헬퍼
export const createNotFoundResponse = (
   message: string = '리소스를 찾을 수 없습니다.',
) => {
   return NextResponse.json({ error: message }, { status: 404 })
}

// 400 에러 응답 생성 헬퍼
export const createBadRequestResponse = (
   message: string = '잘못된 요청입니다.',
) => {
   return NextResponse.json({ error: message }, { status: 400 })
}

// 401 에러 응답 생성 헬퍼
export const createUnauthorizedResponse = (
   message: string = '권한이 없습니다.',
) => {
   return NextResponse.json({ error: message }, { status: 401 })
}

// 성공 응답 생성 헬퍼
export const createSuccessResponse = (data: any, message?: string) => {
   return NextResponse.json({
      success: true,
      message,
      ...data,
   })
}
