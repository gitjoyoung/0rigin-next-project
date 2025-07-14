import { useToast } from '@/shared/hooks/use-toast'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { BoardFormType } from '../../common/schema/board-schema'
import { removeImagesAndMarkdown } from '../../common/utils/markdown-util'

// 클라이언트에서 사용할 게시글 수정 함수
async function updatePostApi(postId: string, data: BoardFormType) {
   const response = await fetch(`/api/post/${postId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   })
   if (!response.ok) {
      throw new Error('게시글 수정에 실패했습니다.')
   }
   return response.json()
}

export function useUpdatePostMutation({
   category,
   editedPost,
}: {
   category: string
   editedPost: any
}) {
   const router = useRouter()
   const queryClient = useQueryClient()
   const { toast } = useToast()
   return useMutation({
      mutationFn: async (data: BoardFormType) => {
         const summary = removeImagesAndMarkdown(data.content)
         const updateData: BoardFormType = {
            title: data.title,
            content: data.content,
            summary,
            thumbnail: data.thumbnail,
            password: data.password,
         }
         return await updatePostApi(editedPost.id, updateData)
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
         toast({
            title: '성공',
            description: '게시글이 성공적으로 수정되었습니다.',
            duration: 3000,
         })
         router.push(`/board/${category}`)
      },
      onError: (error) => {
         toast({
            variant: 'destructive',
            title: '오류',
            description: `수정 오류: ${error.message}`,
            duration: 3000,
         })
      },
   })
}
export const useUpdateBoardPost = ({
   category,
   editedPost,
}: {
   category: string
   editedPost: any
}) => {
   const updatePostMutation = useUpdatePostMutation({ category, editedPost })
   const onSubmit = (data: BoardFormType) => {
      updatePostMutation.mutate(data)
   }
   return {
      isSubmittingPost: updatePostMutation.isPending,
      onSubmit,
   }
}
