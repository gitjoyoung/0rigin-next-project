import { toast } from '@/shared/hooks/use-toast'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { compressImage } from '@/shared/utils/compress-image'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'

const supabase = SupabaseBrowserClient()

export async function uploadImageToSupabase(file: File) {
   const result = await compressImage(file, {
      fileType: 'image/webp',
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
   })
   const timestamp = dayjs().format('YYYYMMDDHHmmss')
   const fileExtension = file.name.split('.').pop()?.toLowerCase()
   const fileName = `thumbnail_${timestamp}.${fileExtension}`
   const { data } = await supabase.storage
      .from('images/thumbnail')
      .upload(fileName, result.file, {
         cacheControl: '3600',
         upsert: false,
         contentType: result.file.type,
      })
   return data?.path
}

export function useImageUploadMutation() {
   return useMutation({
      mutationFn: uploadImageToSupabase,
      onError: (error: any) => {
         toast({
            title: '이미지 업로드 오류',
            description: error.message,
         })
      },
   })
}
