import CustomTitle from '@/components/common/links/CustomTitleLink'
import { ROUTE_QUIZ } from '@/constants/pathname'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import Link from 'next/link'

interface Props {
   quizData: any
}

export default function QuizBoard({ quizData }: Props) {
   return (
      <div className="border p-3">
         <CustomTitle
            title="퀴즈"
            subTitle="매일매일 더 똑똑해지는 0rigin 퀴즈!"
            link={ROUTE_QUIZ}
         />
         <ul className="grid sm:grid-cols-5 gap-3 ">
            {quizData.map((item) => (
               <li
                  key={nanoid()}
                  className="shadow-md rounded-md border text-center"
               >
                  <div className="border-b flex justify-center items-center">
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
         </ul>
      </div>
   )
}
