// features/error/ui/error-page.tsx
'use client'

import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { ErrorProps } from '../model/types'

export function ErrorPage({ error, reset, customMessage }: ErrorProps) {
   useEffect(() => {
      console.error('Error:', error)
   }, [error])

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-sky-400 flex items-center justify-center p-4">
         <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center"
         >
            {/* 앞서 작성한 ErrorPage UI 내용 */}
         </motion.div>
      </div>
   )
}
