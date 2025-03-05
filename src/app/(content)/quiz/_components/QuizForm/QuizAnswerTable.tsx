import { nanoid } from 'nanoid'

interface Props {
   answerTable: { [key: number]: string | number | boolean | null | undefined }
}
export default function QuizSideBar({ answerTable }: Props) {
   return (
      <div className="w-36 flex p-2 flex-wrap justify-center gap-1 border border-black">
         {Object.values(answerTable).map((index, i) => (
            <div
               key={nanoid()}
               className="flex border border-black p-1 justify-center rounded-md font-bold"
            >
               <h1>
                  {i + 1}번 : {index}
               </h1>
            </div>
         ))}
      </div>
   )
}
