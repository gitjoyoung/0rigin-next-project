interface Props {
   index: number
   question: string
}
export default function QuizSubject({ index, question }: Props) {
   return (
      <div className="flex flex-col p-1 gap-3">
         <h1 className="font-bold text-3xl">{index}.</h1>
         <h1 className="font-bold  text-xl break-normal">{question}</h1>
      </div>
   )
}
