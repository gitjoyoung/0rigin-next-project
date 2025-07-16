'use client'

import { useForm } from 'react-hook-form'
import type { BoardFormType } from '../../../common/schema/board-schema'
import PostForm from '../../post-form'
import { useCreateBoardPost } from '../hook/use-create-post'

export default function PostCreateWidget({
   userProfile,
   category,
}: {
   userProfile?: any
   category: string
}) {
   const form = useForm<BoardFormType>({
      defaultValues: {
         title: '',
         content: '',
         thumbnail: '',
         password: '',
         nickname: userProfile?.user_metadata.nickname || '',
      },
   })
   const { isSubmitting, onSubmit } = useCreateBoardPost({
      category,
      userProfile,
   })
   return (
      <PostForm
         form={form}
         isSubmitting={isSubmitting}
         onSubmit={onSubmit}
         userProfile={userProfile}
         submitLabel="제출 하기"
      />
   )
}
