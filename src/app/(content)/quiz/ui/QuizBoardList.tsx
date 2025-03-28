import { Card, CardContent, CardHeader } from '@/shared/shadcn/ui/card'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import Link from 'next/link'
import type { QuizBoardData } from '../types/quizTypes'

interface Props {
   quizList: QuizBoardData[]
}

export default function QuizBoardList({ quizList: quizList }: Props) {
   return (
      <ul className="grid sm:grid-cols-5 gap-3 ">
         {quizList.map((item) => (
            <Card key={nanoid()} className="p-2">
               <CardHeader>
                  <div className="border-b flex justify-center items-center">
                     <Image
                        src={'/mascot/winksaurus.png'}
                        alt={item.name}
                        width={200}
                        height={200}
                        style={{ objectFit: 'contain' }}
                     />
                  </div>
               </CardHeader>
               <CardContent>
                  <Link type="button" href={`/quiz/${item.path}`}>
                     <p className="text-lg">{item.name}</p>
                  </Link>
               </CardContent>
            </Card>
         ))}
      </ul>
   )
}
