// app/introduce/error.tsx
'use client'

import { ErrorPage } from '@/features/error'
import type { ErrorProps } from '@/features/error'

export default function IntroduceError({ error, reset }: ErrorProps) {
   return (
      <ErrorPage
         error={error}
         reset={reset}
         customMessage="소개 페이지를 불러오는 중 문제가 발생했습니다."
      />
   )
}
