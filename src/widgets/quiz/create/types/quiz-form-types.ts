import { z } from 'zod'

// 퀴즈 기본 정보 스키마
export const quizSchema = z.object({
   title: z.string().min(1, '퀴즈 제목을 입력해주세요'),
   description: z.string().optional(),
   questionCount: z
      .number()
      .min(1, '최소 1개 이상의 문제가 필요합니다')
      .max(20, '최대 20개까지 설정 가능합니다'),
   pass_score: z
      .number()
      .min(1, '합격 점수는 1점 이상이어야 합니다')
      .max(100, '합격 점수는 100점 이하여야 합니다'),
})

// 문제 스키마
export const questionSchema = z.object({
   question_text: z.string().min(1, '문제를 입력해주세요'),
   explanation: z.string().optional(),
   option_1: z.string().min(1, '선택지 1을 입력해주세요'),
   option_2: z.string().min(1, '선택지 2를 입력해주세요'),
   option_3: z.string().optional(),
   option_4: z.string().optional(),
   correct_answer: z.number().min(1, '정답을 선택해주세요'),
})

export type QuizFormData = z.infer<typeof quizSchema>
export type QuestionFormData = z.infer<typeof questionSchema>

export interface QuestionFormProps {
   question: QuestionFormData
   index: number
   onUpdate: (index: number, data: QuestionFormData) => void
   onMoveUp?: () => void
   onMoveDown?: () => void
   onRemove?: () => void
   canMoveUp?: boolean
   canMoveDown?: boolean
   canRemove?: boolean
}
