interface Option {
   id: string
   value: string
}

export interface QuizData {
   question: string
   options: Option[]
   hint: string
   answer: string
}
