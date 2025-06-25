import { useToast } from '@/shared/hooks/use-toast'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { compressImage } from '@/shared/utils/compress-image'
import { markdownToSanitizedHTML } from '@/shared/utils/validators/board/formatSanized'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import type { BoardFormType } from '../../create/schema/board-schema'

const supabase = SupabaseBrowserClient()

interface UseUpdatePostProps {
   category: string
   postId: string
}

export const useUpdatePost = ({ category, postId }: UseUpdatePostProps) => {
   const router = useRouter()
   const queryClient = useQueryClient()
   const { toast } = useToast()
   const [uploading, setUploading] = useState(false)

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

   const { mutate: updatePost, isPending: isSubmittingPost } = useMutation({
      mutationFn: async (data: BoardFormType) => {
         const markdownContent = data.content
         const htmlContent = await markdownToSanitizedHTML(markdownContent)

         const postData: any = {
            title: data.title,
            summary: data.summary,
            thumbnail: data.thumbnail,
            content: {
               markdown: markdownContent,
               html: htmlContent,
            },
         }

         const { data: result, error } = await supabase
            .from('posts')
            .update(postData)
            .eq('id', postId)

         if (error) throw error
         return result
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
         toast({
            title: '성공',
            description: '게시글이 수정되었습니다.',
            duration: 3000,
         })
         router.push(`/board/${category}/${postId}`)
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

   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      const file = e.target.files?.[0]
      if (!file) return
      setUploading(true)
      uploadImageMutation.mutate(file)
   }

   const onSubmit = (data: BoardFormType) => {
      updatePost(data)
   }

   return {
      uploading,
      isSubmittingPost,
      uploadImageMutation,
      handleImageUpload,
      onSubmit,
   }
}
