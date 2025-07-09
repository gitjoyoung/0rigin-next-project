import { useToast } from '@/shared/hooks/use-toast'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

interface AuthCheckResponse {
   isAuthor: boolean
   isLoggedIn: boolean
   postAuthorId: string | null
   currentUserId: string | null
}

interface VerifyPasswordResponse {
   success: boolean
   message?: string
}

// 작성자 확인 API
async function checkPostAuthor(postId: string): Promise<AuthCheckResponse> {
   const response = await fetch(`/api/post/${postId}/auth-check`)
   if (!response.ok) {
      throw new Error('작성자 확인에 실패했습니다.')
   }
   return response.json()
}

// 비밀번호 검증 API
async function verifyPassword(
   postId: string,
   password: string,
): Promise<VerifyPasswordResponse> {
   const response = await fetch(`/api/post/${postId}/verify-password`, {
      method: 'POST',
      body: JSON.stringify({ password }),
      headers: { 'Content-Type': 'application/json' },
   })
   if (!response.ok) {
      throw new Error('비밀번호 검증에 실패했습니다.')
   }
   return response.json()
}

// 게시글 삭제 API
async function deletePost(postId: string): Promise<void> {
   const response = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
   })
   if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || '삭제에 실패했습니다.')
   }
}

export function usePostActions(postId: string, category: string) {
   const router = useRouter()
   const { toast } = useToast()

   // 작성자 확인 쿼리 (수동 실행)
   const { refetch: checkAuthor, isLoading: isCheckingAuthor } = useQuery({
      queryKey: ['post-auth', postId],
      queryFn: () => checkPostAuthor(postId),
      enabled: false,
   })

   // 비밀번호 검증 뮤테이션
   const verifyPasswordMutation = useMutation({
      mutationFn: (password: string) => verifyPassword(postId, password),
      onError: (error: Error) => {
         toast({
            variant: 'destructive',
            title: '인증 실패',
            description: error.message,
         })
      },
   })

   // 게시글 삭제 뮤테이션
   const deletePostMutation = useMutation({
      mutationFn: () => deletePost(postId),
      onSuccess: () => {
         toast({
            title: '삭제 완료',
            description: '게시글이 성공적으로 삭제되었습니다.',
         })
         router.push(`/board/${category}`)
      },
      onError: (error: Error) => {
         toast({
            variant: 'destructive',
            title: '삭제 실패',
            description: error.message,
         })
      },
   })

   return {
      // 로딩 상태
      isCheckingAuthor,
      isVerifyingPassword: verifyPasswordMutation.isPending,
      isDeletingPost: deletePostMutation.isPending,

      // 액션 함수
      checkAuthor,
      verifyPassword: verifyPasswordMutation.mutate,
      deletePost: deletePostMutation.mutate,
      navigateToEdit: () => router.push(`/board/${category}/update/${postId}`),

      // 에러 메시지
      passwordError: verifyPasswordMutation.error?.message,
   }
}
