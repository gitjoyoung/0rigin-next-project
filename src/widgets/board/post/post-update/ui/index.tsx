'use client'

import type { Profile } from '@/entities/profile'
import type { Tables } from '@/shared/types'
import { useForm } from 'react-hook-form'
import { type BoardFormType } from '../../../common/schema/board-schema'
import { extractFirstImageUrl } from '../../../common/utils/markdown-util'
import PostForm from '../../post-form'
import { useUpdateBoardPost } from '../hook/use-update-post'

interface Props {
   initialData: Tables<'posts'>
   profile?: Profile | null
   category: string
}

export default function PostUpdateWidget({
   initialData,
   profile,
   category,
}: Props) {
   const form = useForm<BoardFormType>({
      defaultValues: {
         title: initialData.title || '',
         content: (initialData.content as string) || '',
         thumbnail: initialData.thumbnail || undefined,
         summary: initialData.summary || undefined,
         nickname: profile?.nickname || '',
         password: '',
      },
   })

   const { isSubmittingPost, onSubmit } = useUpdateBoardPost({
      category,
      editedPost: initialData,
   })

   // 폼 제출 시 content에서 첫 번째 이미지를 추출해 thumbnail에 할당
   const handleSubmit = (data: BoardFormType) => {
      const firstImage = extractFirstImageUrl(data.content)
      onSubmit({ ...data, thumbnail: firstImage })
   }

   // form이 초기화되지 않은 경우 처리
   if (!form) {
      return <div>Loading...</div>
   }

   return (
      <PostForm
         form={form}
         isSubmitting={isSubmittingPost}
         onSubmit={handleSubmit}
         profile={profile}
         submitLabel="수정 하기"
      />
   )
}
