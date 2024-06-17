'use client'

import Link from 'next/link'
type Props = {
   error: string
   reset?: () => void
}
/**
이 페이지는 fallback: true로 설정된 페이지에서
에러가 발생했을때 보여지는 페이지 입니다.
 */
export default function GlobalError({ error }: Props) {
   return (
      <html lang="ko">
         <body>
            <div>
               <h2>오류가 발생 하였습니다!</h2>
               <p>오류 내용 {error}</p>
               <Link href={'/'} className="p-1 border">
                  다시 시도 하기
               </Link>
            </div>
         </body>
      </html>
   )
}
