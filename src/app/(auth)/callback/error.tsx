'use client'

import Link from 'next/link'

export default function CallbackError({
   error,
   reset,
}: {
   error: Error
   reset: () => void
}) {
   return (
      <div className="min-h-screen flex flex-col items-center justify-center">
         <h1 className="text-2xl font-bold mb-4">인증 오류</h1>
         <p className="mb-2 text-red-500">
            {error.message || '인증 과정에서 문제가 발생했습니다.'}
         </p>
         <button
            onClick={() => reset()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
         >
            다시 시도
         </button>
         <Link href="/" className="mt-2 text-blue-700 underline">
            홈으로 돌아가기
         </Link>
      </div>
   )
}
