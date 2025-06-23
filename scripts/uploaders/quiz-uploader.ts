import { createClient } from '@supabase/supabase-js'
import {
   CreateQuizQuestionRequest,
   CreateQuizRequest,
   Quiz,
} from '../../src/entities/quiz/types'
import { computerScienceQuestions } from '../data/quiz/computer-science-questions'
import { philosophyQuestions } from '../data/quiz/philosophy-questions'
import { programmingQuestions } from '../data/quiz/programming-questions'
import { scienceQuestions } from '../data/quiz/science-questions'

// 환경 변수 로드 (Next.js .env.local 파일 지원)
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

// 업로드에 사용할 authorId를 직접 지정
const AUTHOR_ID = '6f06c41a-93ec-4841-a7de-d0ee0832db15'

// Supabase 클라이언트 생성
const supabase = createClient(
   process.env.NEXT_PUBLIC_SUPABASE_URL!,
   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// 퀴즈 데이터 정의
const QUIZ_DATA = [
   {
      name: '철학 퀴즈',
      path: 'philosophy',
      description: '철학에 대한 기본적인 지식을 테스트합니다.',
      data: philosophyQuestions,
   },
   {
      name: '과학 퀴즈',
      path: 'science',
      description: '자연과학의 다양한 분야를 다룹니다.',
      data: scienceQuestions,
   },
   {
      name: '컴퓨터 퀴즈',
      path: 'computer',
      description: '컴퓨터 과학의 기본 개념을 점검합니다.',
      data: computerScienceQuestions,
   },
   {
      name: '프로그래밍 퀴즈',
      path: 'programming',
      description: '다양한 프로그래밍 언어와 기법을 평가합니다.',
      data: programmingQuestions,
   },
]

// 목업 데이터를 API 형식으로 변환하는 함수
function convertMockDataToApiFormat(mockData: any[]) {
   return mockData.map((item, index) => ({
      question_number: index + 1,
      question_text: item.question,
      question_type: 'multiple_choice' as const,
      points: 1,
      explanation: item.hint,
      option_count: item.options.length,
      option_1: item.options[0].value,
      option_2: item.options[1].value,
      option_3: item.options[2]?.value,
      option_4: item.options[3]?.value,
      option_5: item.options[4]?.value,
      correct_answer: parseInt(item.answer.replace('option', '')),
   }))
}

// 기존 퀴즈 확인 함수
async function checkExistingQuizzes(): Promise<Quiz[]> {
   try {
      const { data, error } = await supabase
         .from('quizzes')
         .select('*')
         .eq('is_public', true)
         .order('created_at', { ascending: false })

      if (error) throw error
      return data || []
   } catch (error) {
      console.warn('기존 퀴즈 확인 중 오류:', error)
      return []
   }
}

// 퀴즈 생성 함수
async function createQuiz(
   quizData: CreateQuizRequest,
   authorId: string,
): Promise<Quiz> {
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

// 퀴즈 문제 생성 함수
async function createQuizQuestion(questionData: CreateQuizQuestionRequest) {
   const { data, error } = await supabase
      .from('quiz_questions')
      .insert(questionData)
      .select()
      .single()

   if (error) throw error
   return data
}

// 퀴즈 데이터 업로드 함수
async function uploadQuizData() {
   console.log('퀴즈 데이터 업로드를 시작합니다...')

   // 환경 변수 확인
   if (
      !process.env.NEXT_PUBLIC_SUPABASE_URL ||
      !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
   ) {
      console.error('❌ Supabase 환경 변수가 설정되지 않았습니다.')
      console.log('다음 환경 변수를 설정해주세요:')
      console.log('- NEXT_PUBLIC_SUPABASE_URL')
      console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
      process.exit(1)
   }

   // authorId를 직접 사용
   const userId = AUTHOR_ID

   // 기존 퀴즈 확인
   const existingQuizzes = await checkExistingQuizzes()
   const existingTitles = existingQuizzes.map((q) => q.title)

   console.log(`기존 퀴즈 ${existingQuizzes.length}개 발견`)

   let uploadedCount = 0
   let skippedCount = 0

   for (const quizInfo of QUIZ_DATA) {
      try {
         // 이미 존재하는 퀴즈인지 확인
         if (existingTitles.includes(quizInfo.name)) {
            console.log(`⏭️  ${quizInfo.name} - 이미 존재하므로 건너뜁니다.`)
            skippedCount++
            continue
         }

         console.log(`\n${quizInfo.name} 업로드 중...`)

         // 퀴즈 생성
         const quizRequest: CreateQuizRequest = {
            title: quizInfo.name,
            description: quizInfo.description,
            is_public: true,
            pass_score: 60, // 기본 통과 점수
         }

         const quiz = await createQuiz(quizRequest, userId)
         console.log(`✅ 퀴즈 생성 완료: ${quiz.title} (ID: ${quiz.id})`)

         // 문제 데이터 변환
         const questions = convertMockDataToApiFormat(quizInfo.data)

         // 문제들 생성
         for (const questionData of questions) {
            const questionRequest: CreateQuizQuestionRequest = {
               quiz_id: quiz.id,
               ...questionData,
            }

            const question = await createQuizQuestion(questionRequest)
            console.log(`  ✅ 문제 ${question.question_number} 생성 완료`)
         }

         console.log(
            `🎉 ${quizInfo.name} 업로드 완료! (총 ${questions.length}문제)`,
         )
         uploadedCount++
      } catch (error) {
         console.error(`❌ ${quizInfo.name} 업로드 실패:`, error)
      }
   }

   console.log('\n=== 업로드 결과 ===')
   console.log(`✅ 새로 업로드된 퀴즈: ${uploadedCount}개`)
   console.log(`⏭️  건너뛴 퀴즈: ${skippedCount}개`)
   console.log(`📊 총 처리된 퀴즈: ${uploadedCount + skippedCount}개`)
   console.log('\n퀴즈 데이터 업로드가 완료되었습니다.')
}

// 스크립트 실행
if (require.main === module) {
   uploadQuizData()
      .then(() => {
         console.log('모든 퀴즈 데이터가 성공적으로 업로드되었습니다.')
         process.exit(0)
      })
      .catch((error) => {
         console.error('퀴즈 데이터 업로드 중 오류가 발생했습니다:', error)
         process.exit(1)
      })
}

export { uploadQuizData }
