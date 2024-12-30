// app/global-error.tsx
'use client'

import { ErrorPage } from '@/features/error'
import type { ErrorProps } from '@/features/error'

export default function GlobalError({ error, reset }: ErrorProps) {
   return (
      <html>
         <body>
            <ErrorPage
               error={error}
               reset={reset}
               customMessage="시스템에 문제가 발생했습니다. 잠시 후 다시 시도해주세요."
            />
         </body>
      </html>
   )
}
