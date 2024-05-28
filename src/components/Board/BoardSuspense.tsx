'use client'

import React, { Suspense } from 'react'

export default function BoardSuspense({ children }) {
   return <Suspense>{children}</Suspense>
}
