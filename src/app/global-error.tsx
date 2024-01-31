'use client'

type Props = {
   error: string
   reset: () => void
}

/**
이 페이지는 fallback: true로 설정된 페이지에서
에러가 발생했을때 보여지는 페이지 입니다.

 */
export default function GlobalError({ error, reset }: Props) {
   return (
      <html lang="ko">
         <body>
            <h2>패이지를 표시 할 수 없습니다 !</h2>
            <p>오류 내용 {error}</p>
            <button type="button" onClick={() => reset()}>
               다시 시도 하기
            </button>
         </body>
      </html>
   )
}
