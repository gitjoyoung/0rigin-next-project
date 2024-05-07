import React from 'react'

export default function layout({ children }: { children: React.ReactNode }) {
   return <div className="border border-yellow-500">{children}</div>
}
