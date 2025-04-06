import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { Login } from '../../../../shared/actions/auth-action'
import { LoginSchema } from '../types/schema'

export const useLogin = () => {
   const { push } = useRouter()

   const { mutate, error, isPending } = useMutation({
      mutationFn: async (values: z.infer<typeof LoginSchema>) => {
         const formData = new FormData()
         Object.entries(values).forEach(([key, value]) => {
            if (typeof value === 'string') {
               formData.append(key, value)
            }
         })
         return Login(formData)
      },
      onSuccess: (result) => {
         if (result.error) {
            throw new Error('아이디 또는 비밀번호가 일치하지 않습니다.')
         }

         if (result.success) {
            window.location.href = result.redirectTo ?? '/'
         }
      },
      onError: (error) => {
         throw new Error(
            '서버와의 통신 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.',
         )
      },
   })

   return {
      loginError: error?.message ?? null,
      mutate,
      isPending,
   }
}
