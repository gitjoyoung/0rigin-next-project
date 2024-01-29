'use client'

export default function GlobalError({ error, reset }) {
   return (
      <html lang="ko">
         <body>
            <h2>404 페이지 !</h2>
            <p>오류 내용 {error}</p>
            <button type="button" onClick={() => reset()}>
               다시 시도 하기
            </button>
         </body>
      </html>
   )
}
