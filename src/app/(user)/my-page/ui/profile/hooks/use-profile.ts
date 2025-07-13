import { Profile } from '@/entities/profile/types'
import { useToast } from '@/shared/hooks/use-toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const profileFormSchema = z.object({
   nickname: z.string().min(2, {
      message: '닉네임은 2글자 이상이어야 합니다.',
   }),
   gender: z.string({
      message: '성별을 선택해주세요.',
   }),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

async function fetchProfile(): Promise<Profile> {
   const response = await fetch('/api/profile')

   if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '프로필 정보를 불러올 수 없습니다.')
   }

   return response.json()
}

async function updateProfile({
   nickname,
   gender,
}: {
   nickname: string
   gender: string
}) {
   const response = await fetch('/api/profile', {
      method: 'PUT',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname, gender }),
   })

   if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || '프로필 업데이트에 실패했습니다.')
   }

   return response.json()
}

export function useProfile() {
   const queryClient = useQueryClient()
   const { toast } = useToast()

   const {
      data: profile,
      isLoading,
      error,
   } = useQuery<Profile, Error>({
      queryKey: ['profile'],
      queryFn: fetchProfile,
   })

   const form = useForm<ProfileFormValues>({
      defaultValues: {
         nickname: '',
         gender: '',
      },
   })

   useEffect(() => {
      if (profile) {
         form.reset({
            nickname: profile.nickname || '',
            gender: profile.gender || '',
         })
      }
   }, [profile, form])

   const updateProfileMutation = useMutation({
      mutationFn: updateProfile,
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['profile'] })
         toast({
            title: '프로필이 업데이트되었습니다.',
            description: '변경사항이 성공적으로 저장되었습니다.',
         })
      },
      onError: (error) => {
         toast({
            title: '오류가 발생했습니다.',
            description: error.message,
            variant: 'destructive',
         })
      },
   })

   function onSubmit(data: ProfileFormValues) {
      console.log('onSubmit', data)
      updateProfileMutation.mutate({
         nickname: data.nickname,
         gender: data.gender,
      })
   }

   return {
      form,
      profile,
      isLoading,
      error,
      updateProfileMutation,
      onSubmit,
   }
}
