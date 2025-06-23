import { SupabaseServerClient } from '@/shared/lib/supabase/supabase-server-client'
import {
   CreateQuizQuestionRequest,
   CreateQuizRequest,
   Quiz,
   QuizAnswer,
   QuizAttempt,
   QuizAttemptDetail,
   QuizDetail,
   QuizQuestion,
   QuizSearchResult,
   StartQuizAttemptRequest,
   SubmitQuizAnswerRequest,
} from '../types'

// 퀴즈 목록 조회
export async function getQuizzes(limit = 10, offset = 0): Promise<Quiz[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quizzes')
      .select(
         `
         *,
         quiz_questions(count)
      `,
      )
      .eq('is_public', true)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) throw error

   // 문제 개수 추가
   const quizzesWithCount = (data || []).map((quiz) => ({
      ...quiz,
      question_count: quiz.quiz_questions?.[0]?.count || 0,
   }))

   return quizzesWithCount
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

   // 퀴즈 문제 조회
   const { data: questions, error: questionsError } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('quiz_id', id)
      .order('question_number', { ascending: true })

   if (questionsError) throw questionsError

   return {
      ...quiz,
      questions: questions || [],
      question_count: questions?.length || 0,
   }
}

// 퀴즈 검색
export async function searchQuizzes(
   keyword: string,
   limit = 5,
   offset = 0,
): Promise<{ data: QuizSearchResult[]; count: number }> {
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
      .select(
         `
         *,
         quiz_questions(count)
      `,
      )
      .eq('is_public', true)
      .or(`title.ilike.%${keyword}%,description.ilike.%${keyword}%`)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) throw error

   // 문제 개수 추가
   const searchResults: QuizSearchResult[] = (data || []).map((quiz) => ({
      ...quiz,
      question_count: quiz.quiz_questions?.[0]?.count || 0,
      thumbnail: '/mascot/logo.webp', // 기본 썸네일
   }))

   return {
      data: searchResults,
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

   // 퀴즈 정보 조회
   const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('id')
      .eq('id', attemptData.quiz_id)
      .eq('is_public', true)
      .single()

   if (quizError) throw quizError
   if (!quiz) throw new Error('퀴즈를 찾을 수 없습니다.')

   // 문제 개수 조회
   const { count: questionCount } = await supabase
      .from('quiz_questions')
      .select('*', { count: 'exact', head: true })
      .eq('quiz_id', attemptData.quiz_id)

   // 응시 기록 생성
   const { data, error } = await supabase
      .from('quiz_attempts')
      .insert({
         quiz_id: attemptData.quiz_id,
         user_id: userId,
         total_questions: questionCount || 0,
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

   // 문제 정보 조회하여 정답 확인
   const { data: question, error: questionError } = await supabase
      .from('quiz_questions')
      .select('correct_answer')
      .eq('id', answerData.question_id)
      .single()

   if (questionError) throw questionError
   if (!question) throw new Error('문제를 찾을 수 없습니다.')

   const isCorrect = answerData.selected_option === question.correct_answer

   // 답변 기록 생성
   const { data, error } = await supabase
      .from('quiz_answers')
      .insert({
         attempt_id: answerData.attempt_id,
         question_id: answerData.question_id,
         selected_option: answerData.selected_option,
         is_correct: isCorrect,
         time_spent: answerData.time_spent,
      })
      .select()
      .single()

   if (error) throw error
   return data
}

// 퀴즈 응시 완료
export async function completeQuizAttempt(
   attemptId: number,
): Promise<QuizAttempt> {
   const supabase = await SupabaseServerClient()

   // 응시 기록 조회
   const { data: attempt, error: attemptError } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('id', attemptId)
      .single()

   if (attemptError) throw attemptError
   if (!attempt) throw new Error('응시 기록을 찾을 수 없습니다.')

   // 정답 개수 계산
   const { count: correctAnswers } = await supabase
      .from('quiz_answers')
      .select('*', { count: 'exact', head: true })
      .eq('attempt_id', attemptId)
      .eq('is_correct', true)

   // 퀴즈 정보 조회하여 합격 점수 확인
   const { data: quiz, error: quizError } = await supabase
      .from('quizzes')
      .select('pass_score')
      .eq('id', attempt.quiz_id)
      .single()

   if (quizError) throw quizError

   const score =
      attempt.total_questions > 0
         ? Math.round(((correctAnswers || 0) / attempt.total_questions) * 100)
         : 0
   const passed = score >= (quiz?.pass_score || 60)

   // 응시 기록 업데이트
   const { data, error } = await supabase
      .from('quiz_attempts')
      .update({
         completed_at: new Date().toISOString(),
         score,
         correct_answers: correctAnswers || 0,
         passed,
      })
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
): Promise<QuizAttemptDetail[]> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_attempts')
      .select(
         `
         *,
         quiz:quizzes(*)
      `,
      )
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .range(offset, offset + limit - 1)

   if (error) throw error

   // 각 응시 기록에 답변 정보 추가
   const attemptsWithAnswers = await Promise.all(
      (data || []).map(async (attempt) => {
         const { data: answers } = await supabase
            .from('quiz_answers')
            .select('*')
            .eq('attempt_id', attempt.id)

         return {
            ...attempt,
            answers: answers || [],
         }
      }),
   )

   return attemptsWithAnswers
}

// 퀴즈 응시 상세 정보 조회
export async function getQuizAttemptDetail(
   attemptId: number,
): Promise<QuizAttemptDetail | null> {
   const supabase = await SupabaseServerClient()

   const { data, error } = await supabase
      .from('quiz_attempts')
      .select(
         `
         *,
         quiz:quizzes(*)
      `,
      )
      .eq('id', attemptId)
      .single()

   if (error) throw error
   if (!data) return null

   // 답변 정보 조회
   const { data: answers } = await supabase
      .from('quiz_answers')
      .select('*')
      .eq('attempt_id', attemptId)

   return {
      ...data,
      answers: answers || [],
   }
}
