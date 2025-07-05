import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import {
   CreateQuizQuestionRequest,
   CreateQuizRequest,
   Quiz,
   QuizAnswer,
   QuizAttempt,
   QuizDetail,
   QuizQuestion,
   StartQuizAttemptRequest,
   SubmitQuizAnswerRequest,
} from '../types'

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
      .eq('quiz_id', id)
      .order('question_number', { ascending: true })

   if (questionsError) throw questionsError

   const quizQuestions = (questions || []).map((q) => ({
      ...q,
      question_type: q.question_type as any as
         | 'multiple_choice'
         | 'true_false'
         | 'essay',
   })) as QuizQuestion[]

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

// 퀴즈 응시 시작
export async function startQuizAttempt(
   attemptData: StartQuizAttemptRequest,
   userId: string,
): Promise<QuizAttempt> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
         quiz_id: attemptData.quiz_id,
         user_id: userId,
      })
      .select()
      .single()

   if (error) throw error
   return data
}

// 퀴즈 답변 제출
export async function submitQuizAnswer(
   answerData: SubmitQuizAnswerRequest,
): Promise<QuizAnswer> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_answers')
      .insert(answerData)
      .select()
      .single()

   if (error) throw error
   return data
}

// 퀴즈 응시 완료
export async function completeQuizAttempt(
   attemptId: number,
   updateData: Partial<QuizAttempt>,
): Promise<QuizAttempt> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_attempts')
      .update(updateData)
      .eq('id', attemptId)
      .select()
      .single()

   if (error) throw error
   return data
}

// 사용자의 퀴즈 응시 기록 조회
export async function getUserQuizAttempts(
   userId: string,
   limit = 10,
   offset = 0,
): Promise<QuizAttempt[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) throw error
   return data || []
}

// 퀴즈 응시 상세 정보 조회
export async function getQuizAttemptById(
   attemptId: number,
): Promise<QuizAttempt | null> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('id', attemptId)
      .single()

   if (error) throw error
   return data
}

// 퀴즈 응시 답변 조회
export async function getQuizAnswersByAttemptId(
   attemptId: number,
): Promise<QuizAnswer[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_answers')
      .select('*')
      .eq('attempt_id', attemptId)

   if (error) throw error
   return data || []
}
