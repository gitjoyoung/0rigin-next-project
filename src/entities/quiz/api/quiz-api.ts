import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import { Tables } from '@/shared/types/database.types'

// 데이터베이스 스키마 기반 타입 사용
export type Quiz = Tables<'quizzes'>
export type QuizQuestion = Tables<'quiz_questions'>
export type QuizAttempt = Tables<'quiz_attempts'>
export type QuizAnswer = Tables<'quiz_answers'>

// 퀴즈 상세 정보 타입 (문제 포함)
export interface QuizDetail extends Quiz {
   questions: QuizQuestion[]
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

// 퀴즈 목록 조회
export async function getQuizzes(limit = 10, offset = 0): Promise<Quiz[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) throw error
   return data || []
}

// 퀴즈 상세 조회 (문제 포함)
export async function getQuizById(id: number): Promise<QuizDetail | null> {
   const supabase = await SupabaseServerClient()

   // 퀴즈 기본 정보 조회
   const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('*')
      .eq('id', id)
      .eq('is_public', true)
      .single()

   if (quizError) throw quizError
   if (!quiz) return null

   // 퀴즈 문제들 조회
   const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quiz.id)
      .order('question_number', { ascending: true })

   if (questionsError) throw questionsError

   const quizQuestions = (questions || []) as QuizQuestion[]

   return {
      ...quiz,
      questions: quizQuestions,
      total_questions: quizQuestions.length,
   }
}

// 퀴즈 문제 목록 조회
export async function getQuizQuestions(
   quizId: number,
): Promise<QuizQuestion[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', quizId)
      .order('question_number', { ascending: true })

   if (error) throw error
   return data || []
}

// 퀴즈 검색
export async function searchQuizzes(
   keyword: string,
   limit = 5,
   offset = 0,
): Promise<{ data: Quiz[]; count: number }> {
   const supabase = await SupabaseServerClient()

   // 전체 개수 조회
   const { count } = await supabase
      .from('quizzes')
      .select('*', { count: 'exact', head: true })
      .eq('is_public', true)
      .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)

   // 검색 결과 조회
   const { data, error } = await supabase
      .from('quizzes')
      .select('*')
      .eq('is_public', true)
      .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) throw error

   return {
      data: data || [],
      count: count || 0,
   }
}

// 퀴즈 생성
export async function createQuiz(
   quizData: CreateQuizRequest,
   authorId: string,
): Promise<Quiz> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quizzes')
      .insert({
         ...quizData,
         author_id: authorId,
      })
      .select()
      .single()

   if (error) throw error
   return data
}

// 퀴즈 문제 생성
export async function createQuizQuestion(
   questionData: CreateQuizQuestionRequest,
): Promise<QuizQuestion> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_questions')
      .insert(questionData)
      .select()
      .single()

   if (error) throw error
   return data
}
