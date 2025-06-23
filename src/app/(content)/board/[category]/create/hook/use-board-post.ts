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
}

export const useBoardPost = ({ category, userProfile }: UseBoardPostProps) => {
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

   // 게시글 작성 뮤테이션
   const { mutate: submitPost, isPending: isSubmittingPost } = useMutation({
      mutationFn: async (data: BoardFormType) => {
         const markdownContent = data.content
         const htmlContent = await markdownToSanitizedHTML(markdownContent)

         // 로그인된 사용자와 비로그인 사용자에 따라 다른 데이터 처리
         const postData: any = {
            title: data.title,
            summary: data.summary,
            thumbnail: data.thumbnail,
            content: {
               markdown: markdownContent,
               html: htmlContent,
            },
            category: category,
         }

         if (userProfile?.id) {
            // 로그인된 사용자: 프로필 정보 사용
            postData.nickname = userProfile.nickname || '익명'
            postData.password = userProfile.id.slice(0, 4) // 임시 비밀번호
            postData.author_id = userProfile.id
         } else {
            // 비로그인 사용자: 폼에서 입력받은 정보 사용
            postData.nickname = data.nickname
            postData.password = data.password
         }

         const { data: result, error } = await supabase
            .from('posts')
            .insert(postData)

         if (error) throw error
         return result
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['posts'] })
         toast({
            title: '성공',
            description: '게시글이 성공적으로 작성되었습니다.',
            duration: 3000,
         })
         router.push(`/board/${category}`)
      },
      onError: (error) => {
         toast({
            variant: 'destructive',
            title: '오류',
            description: `글쓰기 오류: ${error.message}`,
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
