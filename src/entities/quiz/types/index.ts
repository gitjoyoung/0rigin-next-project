// 퀴즈 메인 테이블 타입
export interface Quiz {
   id: number
   created_at: string
   updated_at: string
   title: string
   description?: string
   author_id: string
   is_public: boolean
   time_limit?: number
   pass_score: number
   question_count?: number
}

// 퀴즈 문제 테이블 타입
export interface QuizQuestion {
   id: number
   quiz_id: number
   question_number: number
   question_text: string
   question_type: 'multiple_choice' | 'true_false' | 'essay'
   points: number
   explanation?: string
   media_url?: string
   option_count: number
   option_1: string
   option_2: string
   option_3?: string
   option_4?: string
   option_5?: string
   correct_answer: number
}

// 퀴즈 응시 결과 타입
export interface QuizAttempt {
   id: number
   quiz_id: number
   user_id: string
   started_at: string
   completed_at?: string
   score?: number
   total_questions: number
   correct_answers?: number
   passed?: boolean
}

// 응시자의 문제별 답변 기록 타입
export interface QuizAnswer {
   id: number
   attempt_id: number
   question_id: number
   selected_option: number
   is_correct: boolean
   time_spent?: number
}

// 퀴즈 생성 요청 타입
export interface CreateQuizRequest {
   title: string
   description?: string
   is_public?: boolean
   time_limit?: number
   pass_score?: number
}

// 퀴즈 문제 생성 요청 타입
export interface CreateQuizQuestionRequest {
   quiz_id: number
   question_number: number
   question_text: string
   question_type?: 'multiple_choice' | 'true_false' | 'essay'
   points?: number
   explanation?: string
   media_url?: string
   option_count: number
   option_1: string
   option_2: string
   option_3?: string
   option_4?: string
   option_5?: string
   correct_answer: number
}

// 퀴즈 응시 시작 요청 타입
export interface StartQuizAttemptRequest {
   quiz_id: number
}

// 퀴즈 답변 제출 요청 타입
export interface SubmitQuizAnswerRequest {
   attempt_id: number
   question_id: number
   selected_option: number
   time_spent?: number
}

// 퀴즈 완료 요청 타입
export interface CompleteQuizAttemptRequest {
   attempt_id: number
}

// 퀴즈 검색 결과 타입
export interface QuizSearchResult {
   id: number
   title: string
   description?: string
   created_at: string
   author_id: string
   is_public: boolean
   time_limit?: number
   pass_score: number
   question_count?: number
   thumbnail?: string
}

// 퀴즈 상세 정보 타입 (문제 포함)
export interface QuizDetail extends Quiz {
   questions: QuizQuestion[]
   question_count: number
}

// 퀴즈 응시 상세 정보 타입
export interface QuizAttemptDetail extends QuizAttempt {
   answers: QuizAnswer[]
   quiz: Quiz
}
