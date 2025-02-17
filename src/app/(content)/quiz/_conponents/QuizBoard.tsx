import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { nanoid } from 'nanoid'

interface Props {
   quizData: any
}

export default function QuizBoard({ quizData }: Props) {
   const res = fetch('https://api.github.com/users/octocat', {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_GITHUB,
      },
   })
   return (
      <div className="border p-3">
         {/* <ul className="grid sm:grid-cols-5 gap-3 ">
            {quizData.map((item) => (
               <li
                  key={nanoid()}
                  className="shadow-md rounded-md border text-center"
               >
                  <div className="border-b flex justify-center ">
                     xc
                     <Image
                        src={'/mascot/winksaurus.png'}
                        alt={item.name}
                        width={200}
                        height={200}
                        style={{ objectFit: 'contain' }}
                     />
                  </div>

                  <div className="m-3">
                     <Link type="button" href={`/quiz/${item.path}`}>
                        <p className="text-lg">{item.name}</p>
                     </Link>
                  </div>
               </li>
            ))}
         </ul> */}
      </div>
   )
}
