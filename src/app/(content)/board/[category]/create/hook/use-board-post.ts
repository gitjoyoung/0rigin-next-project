'use client'

import type { PostCreate, PostUpdate } from '@/entities/post/types'
import { useToast } from '@/shared/hooks/use-toast'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { compressImage } from '@/shared/utils/compress-image'
import { markdownToSanitizedHTML } from '@/shared/utils/validators/board/formatSanized'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { type BoardFormType } from '../schema/board-schema'

const supabase = SupabaseBrowserClient()

interface UseBoardPostProps {
   category: string
   userProfile?: any
   post?: any
}

// 클라이언트에서 사용할 게시글 생성 함수
async function createPostApi(data: PostCreate) {
   const response = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
   })
   if (!response.ok) {
      throw new Error('게시글 생성에 실패했습니다.')
   }
   return response.json()
}

// 클라이언트에서 사용할 게시글 수정 함수
async function updatePostApi(postId: string, data: PostUpdate) {
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

export const useBoardPost = ({
   category,
   userProfile,
   post,
}: UseBoardPostProps) => {
   const router = useRouter()
   const queryClient = useQueryClient()
   const { toast } = useToast()
   const [uploading, setUploading] = useState(false)

   // 이미지 업로드 뮤테이션
   const uploadImageMutation = useMutation({
      mutationFn: async (file: File) => {
         const result = await compressImage(file, {
            fileType: 'image/webp',
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
         })

         if (result.status === 'error') throw new Error('이미지 압축 실패')

         const timestamp = dayjs().format('YYYYMMDDHHmmss')
         const fileExtension = file.name.split('.').pop()?.toLowerCase()
         const newFileName = `public/thumbnail_${timestamp}.${fileExtension}`

         const { data, error } = await supabase.storage
            .from('images')
            .upload(newFileName, result.file, {
               cacheControl: '3600',
               upsert: false,
               contentType: result.file.type,
            })

         if (error) throw error

         const {
            data: { publicUrl },
         } = supabase.storage.from('images').getPublicUrl(data.path)

         return publicUrl
      },
      onSuccess: () => {
         setUploading(false)
      },
      onError: () => {
         alert('이미지 업로드에 실패했습니다.')
         setUploading(false)
      },
   })

   // 게시글 작성/수정 뮤테이션
   const { mutate: submitPost, isPending: isSubmittingPost } = useMutation({
      mutationFn: async (data: BoardFormType) => {
         const markdownContent = data.content
         const htmlContent = await markdownToSanitizedHTML(markdownContent)

         if (post) {
            // 수정 모드
            const updateData: PostUpdate = {
               title: data.title,
               content: markdownContent,
               summary: data.summary,
               thumbnail: data.thumbnail,
               password: data.password,
            }
            return await updatePostApi(post.id, updateData)
         } else {
            // 생성 모드
            const postData: PostCreate = {
               title: data.title,
               content: markdownContent,
               summary: data.summary,
               thumbnail: data.thumbnail,
               category: category, // 카테고리 필드 추가
               nickname: data.nickname,
               password: data.password || undefined,
               author_id: userProfile?.id || undefined,
            }
            return await createPostApi(postData)
         }
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
         toast({
            title: '성공',
            description: post
               ? '게시글이 성공적으로 수정되었습니다.'
               : '게시글이 성공적으로 작성되었습니다.',
            duration: 3000,
         })
         router.push(`/board/${category}`)
      },
      onError: (error) => {
         toast({
            variant: 'destructive',
            title: '오류',
            description: post
               ? `수정 오류: ${error.message}`
               : `글쓰기 오류: ${error.message}`,
            duration: 3000,
         })
      },
   })

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const file = e.target.files?.[0]
      if (!file) return
      setUploading(true)
      uploadImageMutation.mutate(file)
   }

   const onSubmit = (data: BoardFormType) => {
      submitPost(data)
   }

   return {
      userData: userProfile ? { user: userProfile } : null,
      uploading,
      isSubmittingPost,
      uploadImageMutation,
      handleImageUpload,
      onSubmit,
   }
}
