'use client'

import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardFooter,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'
import type { ErrorProps } from 'next/error'
import { useRouter } from 'next/navigation'

export default function GlobalError({
   statusCode,
   hostname,
   title,
}: ErrorProps) {
   const router = useRouter()

   return (
      <html>
         <body>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
               >
                  <Card className="w-[400px] bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                     <CardHeader className="space-y-1">
                        <div className="flex items-center justify-center mb-4">
                           <AlertCircle className="h-16 w-16 text-red-500" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-center text-white">
                           {title || '서버 오류가 발생했습니다'}
                        </CardTitle>
                     </CardHeader>
                     <CardContent className="text-center text-slate-300 flex flex-col gap-2">
                        <p className="mb-4">
                           죄송합니다. 서버에서 예기치 않은 오류가
                           발생했습니다.잠시 후 다시 시도해 주세요.
                        </p>
                        <p className="text-sm text-slate-400">
                           {statusCode && `오류 코드: ${statusCode}`}
                        </p>
                     </CardContent>
                     <CardFooter className="flex justify-center gap-4">
                        <Button
                           onClick={() => {
                              if (hostname) {
                                 window.location.href = hostname
                              } else {
                                 router.push('/')
                              }
                           }}
                           variant="outline"
                           className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                        >
                           다시 시도
                        </Button>
                        <Button
                           onClick={() => {
                              router.push('/')
                           }}
                           variant="outline"
                           className="bg-slate-700 hover:bg-slate-600 text-white border-slate-600"
                        >
                           홈으로
                        </Button>
                     </CardFooter>
                  </Card>
               </motion.div>
            </div>
         </body>
      </html>
   )
}
