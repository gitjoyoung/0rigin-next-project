import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { MatchingResult } from '../types'

interface SearchRequest {
   category: string
   question: string
}

interface SearchResponse {
   results: MatchingResult[]
}

async function searchPhilosophers(
   data: SearchRequest,
): Promise<SearchResponse> {
   console.log('🔍 API 요청 시작:', data)

   const response = await fetch('/api/ai', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })

   console.log('📡 API 응답 상태:', response.status, response.statusText)

   const result = await response.json()
   console.log('📦 API 응답 데이터:', result)

   if (!response.ok) {
      const errorMessage = result?.error || '답변 생성에 실패했습니다.'
      console.error('❌ API 에러:', errorMessage)
      throw new Error(errorMessage)
   }

   console.log('✅ API 요청 성공')
   return result
}

export function usePhilosopherSearch() {
   const mutation = useMutation({
      mutationFn: searchPhilosophers,
      onError: (error) => {
         console.error('철학가 검색 오류:', error)
      },
   })
   const form = useForm({
      defaultValues: {
         category: '',
         question: '',
      },
   })

   const results = mutation.data?.results || []

   const onSubmit = (data: { category: string; question: string }) => {
      mutation.mutate(data)
   }

   return {
      onSubmit,
      form,
      results: results,
      isLoading: mutation.isPending,
      error: mutation.error,
      isSuccess: mutation.isSuccess,
   }
}
