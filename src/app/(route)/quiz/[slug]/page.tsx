import Quiz from '@/components/Quiz/Quiz'
import React from 'react'

export default function page({ params }) {
   const { slug } = params
   console.log(slug)

   const quizData = [
      {
         question:
            '플라톤의 이데아론에 따르면, 진정한 지식은 무엇에 대한 이해를 통해 얻어질 수 있는가?',
         options: [
            { id: 'option1', value: '감각적 대상' },
            { id: 'option2', value: '이데아' },
            { id: 'option3', value: '물질적 세계' },
            { id: 'option4', value: '개인적 경험' },
         ],
         hint: '이데아는 무엇인가?',
         answer: 'option2',
      },
      {
         question: '222는가?',
         options: [
            { id: 'option1', value: '감각적 대상' },
            { id: 'option2', value: '이데아' },
            { id: 'option3', value: '물질적 세계' },
            { id: 'option4', value: '개인적 경험' },
         ],
         hint: '이데아는 무엇인가?',
         answer: 'option2',
      },
   ]
   return (
      <div>
         <Quiz quizData={quizData} />
      </div>
   )
}
