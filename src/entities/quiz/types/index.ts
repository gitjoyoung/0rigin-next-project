import { Tables } from '@/shared/types/database.types'

// 데이터베이스 스키마 기반 타입 사용
export type Quiz = Tables<'quizzes'>
export type QuizQuestion = Tables<'quiz_questions'>
export type QuizAttempt = Tables<'quiz_attempts'>
export type QuizAnswer = Tables<'quiz_answers'>

// 옵션 타입 정의
export interface QuizOption {
   id: string
   text: string
}

// 확장된 퀴즈 문제 타입 (옵션 배열 포함)
export interface QuizQuestionWithOptions extends QuizQuestion {
   options: QuizOption[]
}

// 퀴즈 상세 정보 타입 (문제 포함)
export interface QuizDetail extends Quiz {
   questions: QuizQuestionWithOptions[]
   total_questions: number
}

// 퀴즈 생성 요청 타입
export interface CreateQuizRequest {
   title: string
   description?: string | null
   is_public?: boolean
   time_limit?: number | null
   pass_score?: number | null
}

// 퀴즈 문제 생성 요청 타입
export interface CreateQuizQuestionRequest {
   quiz_id: number
   question_number: number
   question_text: string
   question_type?: string
   points?: number
   explanation?: string | null
   media_url?: string | null
   option_count: number
   option_1: string
   option_2: string
   option_3?: string | null
   option_4?: string | null
   option_5?: string | null
   correct_answer: number
}
