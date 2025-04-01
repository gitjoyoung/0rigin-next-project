// app/global-error.tsx
'use client'

import type { ErrorProps } from '@/features/error'
import { ErrorPage } from '@/features/error'

export default function GlobalError({ error, reset }: ErrorProps) {
   return (
      <html>
         <body>
            <ErrorPage error={error} reset={reset} />
         </body>
      </html>
   )
}
