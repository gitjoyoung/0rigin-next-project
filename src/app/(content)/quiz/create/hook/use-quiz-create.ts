import { useToast } from '@/shared/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface IQuizForm {
   title: string
   description: string
   is_public: boolean
   questions: Array<{
      question_number: number
      question_text: string
      explanation: string
      option_1: string
      option_2: string
      option_3: string
      option_4: string
      option_5: string
      option_count: number
      correct_answer: number
   }>
}

export function useQuizCreate() {
   const router = useRouter()
   const { toast } = useToast()
   const [isSubmitting, setIsSubmitting] = useState(false)
   const [errors, setErrors] = useState<string[]>([])

   const [form, setForm] = useState<IQuizForm>({
      title: '',
      description: '',
      is_public: true,
      questions: [
         {
            question_number: 1,
            question_text: '',
            explanation: '',
            option_1: '',
            option_2: '',
            option_3: '',
            option_4: '',
            option_5: '',
            option_count: 2,
            correct_answer: 1,
         },
      ],
   })

   // 폼 유효성 검사
   const validateForm = (): { isValid: boolean; errors: string[] } => {
      const errors: string[] = []

      if (!form.title.trim()) {
         errors.push('퀴즈 제목을 입력해주세요.')
      }

      if (form.questions.some((q) => !q.question_text.trim())) {
         errors.push('모든 문제의 제목을 입력해주세요.')
      }

      // 선택지 유효성 검사: 최소 2개, 최대 5개
      for (let i = 0; i < form.questions.length; i++) {
         const question = form.questions[i]
         const validOptions = [
            question.option_1,
            question.option_2,
            question.option_3,
            question.option_4,
            question.option_5,
         ].filter((option) => option.trim() !== '')

         if (validOptions.length < 2) {
            errors.push(`문제 ${i + 1}: 최소 2개의 선택지를 입력해주세요.`)
         }

         if (validOptions.length > 5) {
            errors.push(
               `문제 ${i + 1}: 최대 5개의 선택지만 입력할 수 있습니다.`,
            )
         }

         // 정답이 유효한 선택지 범위 내에 있는지 확인
         if (
            question.correct_answer < 1 ||
            question.correct_answer > validOptions.length
         ) {
            errors.push(`문제 ${i + 1}: 정답 번호가 유효하지 않습니다.`)
         }
      }

      return {
         isValid: errors.length === 0,
         errors,
      }
   }

   // 퀴즈 제출
   const submitQuiz = async () => {
      setErrors([])
      const validation = validateForm()

      if (!validation.isValid) {
         setErrors(validation.errors)
         return
      }

      setIsSubmitting(true)

      try {
         // 퀴즈 생성 API 호출
         const quizResponse = await fetch('/api/quiz', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               title: form.title,
               description: form.description,
               is_public: form.is_public,
            }),
         })

         if (!quizResponse.ok) {
            const errorData = await quizResponse.json()

            // 로그인 관련 오류인 경우
            if (
               quizResponse.status === 401 ||
               errorData.error?.includes('로그인')
            ) {
               alert('로그인이 필요합니다.')
               // 퀴즈 페이지로 리다이렉트
               router.push('/quiz')
               return
            }

            throw new Error(errorData.error || '퀴즈 생성에 실패했습니다.')
         }

         const quiz = await quizResponse.json()

         // 문제들 생성 API 호출
         for (const question of form.questions) {
            const questionResponse = await fetch('/api/quiz/question', {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json',
               },
               body: JSON.stringify({
                  quiz_id: quiz.id,
                  question_number: question.question_number,
                  question_text: question.question_text,
                  question_type: 'multiple_choice',
                  points: 1,
                  explanation: question.explanation,
                  option_count: question.option_count,
                  option_1: question.option_1,
                  option_2: question.option_2,
                  option_3: question.option_3,
                  option_4: question.option_4,
                  option_5: question.option_5,
                  correct_answer: question.correct_answer,
               }),
            })

            if (!questionResponse.ok) {
               const errorData = await questionResponse.json()

               // 로그인 관련 오류인 경우
               if (
                  questionResponse.status === 401 ||
                  errorData.error?.includes('로그인')
               ) {
                  toast({
                     title: '로그인이 필요합니다.',
                     description: '세션이 만료되었습니다. 다시 로그인해주세요.',
                     variant: 'destructive',
                  })

                  // 퀴즈 페이지로 리다이렉트
                  router.push('/quiz?error=login_required')
                  return
               }

               throw new Error(errorData.error || '문제 생성에 실패했습니다.')
            }
         }

         // 성공 시 퀴즈 상세 페이지로 이동
         router.push(`/quiz/${quiz.id}`)
      } catch (error) {
         console.error('퀴즈 생성 오류:', error)
         setErrors([
            error instanceof Error
               ? error.message
               : '퀴즈 생성 중 오류가 발생했습니다.',
         ])
      } finally {
         setIsSubmitting(false)
      }
   }

   // 폼 필드 업데이트
   const updateFormField = (
      field: keyof IQuizForm,
      value: string | number | boolean | undefined,
   ) => {
      setForm((prev) => ({ ...prev, [field]: value }))
   }

   // 문제 추가
   const addQuestion = () => {
      setForm((prev) => ({
         ...prev,
         questions: [
            ...prev.questions,
            {
               question_number: prev.questions.length + 1,
               question_text: '',
               explanation: '',
               option_1: '',
               option_2: '',
               option_3: '',
               option_4: '',
               option_5: '',
               option_count: 2,
               correct_answer: 1,
            },
         ],
      }))
   }

   // 문제 삭제
   const removeQuestion = (index: number) => {
      setForm((prev) => ({
         ...prev,
         questions: prev.questions
            .filter((_, i) => i !== index)
            .map((q, i) => ({ ...q, question_number: i + 1 })),
      }))
   }

   // 문제 필드 업데이트
   const updateQuestionField = (
      questionIndex: number,
      field: string,
      value: string | number,
   ) => {
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         const question = { ...newQuestions[questionIndex] }
         ;(question as any)[field] = value
         newQuestions[questionIndex] = question
         return { ...prev, questions: newQuestions }
      })
   }

   // 선택지 추가
   const addOption = (questionIndex: number) => {
      const currentQuestion = form.questions[questionIndex]

      if (currentQuestion.option_count >= 5) return

      setForm((prev) => {
         const newQuestions = [...prev.questions]
         const question = { ...newQuestions[questionIndex] }
         question.option_count += 1
         newQuestions[questionIndex] = question
         return { ...prev, questions: newQuestions }
      })
   }

   // 선택지 삭제
   const removeOption = (questionIndex: number, optionNumber: number) => {
      const currentQuestion = form.questions[questionIndex]

      if (currentQuestion.option_count <= 2) return

      setForm((prev) => {
         const newQuestions = [...prev.questions]
         const question = { ...newQuestions[questionIndex] }

         // 정답이 삭제되는 옵션이면 정답을 1로 변경
         if (question.correct_answer === optionNumber) {
            question.correct_answer = 1
         } else if (question.correct_answer > optionNumber) {
            question.correct_answer -= 1
         }

         question.option_count -= 1
         newQuestions[questionIndex] = question
         return { ...prev, questions: newQuestions }
      })
   }

   // 선택지 값 업데이트
   const updateOptionValue = (
      questionIndex: number,
      optionNumber: number,
      value: string,
   ) => {
      setForm((prev) => {
         const newQuestions = [...prev.questions]
         const question = { ...newQuestions[questionIndex] }
         ;(question as any)[`option_${optionNumber}`] = value
         newQuestions[questionIndex] = question
         return { ...prev, questions: newQuestions }
      })
   }

   return {
      form,
      isSubmitting,
      errors,
      submitQuiz,
      updateFormField,
      addQuestion,
      removeQuestion,
      updateQuestionField,
      addOption,
      removeOption,
      updateOptionValue,
   }
}
