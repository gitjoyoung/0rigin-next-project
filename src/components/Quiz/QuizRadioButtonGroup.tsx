import React from 'react'
import { v4 as uuid } from 'uuid'
import QuizQuestion from './QuizQustions'

export default function QuizRadioButtonGroup({
   questions,
   answer,
   isCorrect,
   selectedOption,
}) {
   return (
      <div className="flex-col flex gap-1 my-2 justify-center ">
         {questions.map(({ id, value }, index) => (
            <QuizQuestion
               key={uuid()}
               id={id}
               value={value}
               index={index}
               answer={answer}
               isCorrect={isCorrect}
               selectedOption={selectedOption}
            />
         ))}
      </div>
   )
}
