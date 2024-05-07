import React, { Suspense } from 'react'

export default function SearchSuspense({ children }) {
   return <Suspense>{children}</Suspense>
}
