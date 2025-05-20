import { getUser } from '@/entities/auth/api/get-user'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { useToast } from '@/shared/shadcn/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

export const profileFormSchema = z.object({
   nickname: z.string().min(2, {
      message: '닉네임은 2글자 이상이어야 합니다.',
   }),
   gender: z.string({
      required_error: '성별을 선택해주세요.',
   }),
})

export type ProfileFormValues = z.infer<typeof profileFormSchema>

export type Profile = {
   id: string
   email: string
   nickname: string
   gender: string
   created_at: string
}

async function fetchProfile(): Promise<Profile> {
   const supabase = await SupabaseBrowserClient()
   const user = await getUser()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single()

   if (error) {
      throw new Error('프로필 정보를 불러올 수 없습니다.')
   }

   return data as Profile
}

async function updateProfile({
   nickname,
   gender,
}: {
   nickname: string
   gender: string
}) {
   const supabase = await SupabaseBrowserClient()
   const {
      data: { user },
   } = await supabase.auth.getUser()

   if (!user) {
      throw new Error('사용자 정보를 불러올 수 없습니다.')
   }

   const { error } = await supabase
      .from('users')
      .update({ nickname, gender })
      .eq('id', user.id)

   if (error) {
      throw new Error('프로필 업데이트에 실패했습니다.')
   }
}

export function useProfile() {
   const queryClient = useQueryClient()
   const { toast } = useToast()

   const form = useForm<ProfileFormValues>({
      resolver: zodResolver(profileFormSchema),
      defaultValues: {
         nickname: '',
         gender: '',
      },
   })

   const {
      data: profile,
      isLoading,
      error,
   } = useQuery<Profile, Error>({
      queryKey: ['profile'],
      queryFn: fetchProfile,
   })

   useEffect(() => {
      if (profile) {
         form.reset({
            nickname: profile.nickname,
            gender: profile.gender,
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
      toast({
         title: '테스트용 토스트.',
         description: '테스트용 토스트입니다.',
      })
      // updateProfileMutation.mutate({
      //    nickname: data.nickname,
      //    gender: data.gender,
      // })
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
