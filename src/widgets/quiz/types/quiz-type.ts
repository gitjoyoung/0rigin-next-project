interface IQuizData {
   question: string
   options: Array<{ id: string; value: string }>
   answer: string
   hint: string
}

export type { IQuizData }
