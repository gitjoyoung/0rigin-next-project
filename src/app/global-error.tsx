// app/global-error.tsx
'use client'

import { ErrorPage } from '@/features/error'
import type { ErrorProps } from 'next/error'

export default function GlobalError({
   statusCode,
   hostname,
   title,
}: ErrorProps) {
   return (
      <html>
         <body>
            <ErrorPage
               statusCode={statusCode}
               hostname={hostname}
               title={title}
            />
         </body>
      </html>
   )
}
