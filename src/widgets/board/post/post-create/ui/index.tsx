'use client'

import type { Profile } from '@/entities/profile'
import { useForm } from 'react-hook-form'
import type { BoardFormType } from '../../../common/schema/board-schema'
import PostForm from '../../post-form'
import { useCreateBoardPost } from '../hook/use-create-post'

export default function PostCreateWidget({
   profile,
   category,
}: {
   profile: Profile | null
   category: string
}) {
   const form = useForm<BoardFormType>({
      defaultValues: {
         title: '',
         content: '',
         thumbnail: '',
         password: '',
         nickname: profile?.nickname || '',
      },
   })
   const { isSubmitting, onSubmit } = useCreateBoardPost({
      category,
      profile,
   })
   return (
      <PostForm
         form={form}
         isSubmitting={isSubmitting}
         onSubmit={onSubmit}
         profile={profile}
         submitLabel="제출 하기"
      />
   )
}
