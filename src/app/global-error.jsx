'use client';

export default function GlobalError({ error, reset }) {
   return (
      <html>
         <body>
            <h2>오류 페이지 !</h2>
            <button onClick={() => reset()}>다시 시도 하기</button>
         </body>
      </html>
   );
}
