'use client'
import { ROUTES } from '@/constants/route'
import { signInWithCredentials } from '@/serverAction/auth'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ROUTE_FORGET, ROUTE_SIGN } from '@/constants/pathname'

const loginSchema = z.object({
   email: z.string().email('올바른 이메일을 입력해주세요'),
   password: z.string().min(1, '비밀번호를 입력해주세요'),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
   const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
   } = useForm<LoginFormData>({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: '',
         password: '',
      },
   })

   const onSubmit = async (data: LoginFormData) => {
      try {
         const formData = new FormData()
         formData.append('email', data.email)
         formData.append('password', data.password)
         await signInWithCredentials(formData)
      } catch (error) {
         console.error('Login error:', error)
      }
   }

   return (
      <section className="w-full h-full my-auto flex justify-center items-center">
         <div className="flex flex-col h-full border p-10 justify-center items-center gap-6 m-3 rounded-xl">
            {/* 타이틀 */}
            <div>
               <h1 className="font-bold text-2xl">로그인</h1>
            </div>

            {/* 입력폼 */}
            <form
               className="flex flex-col gap-3"
               onSubmit={handleSubmit(onSubmit)}
            >
               <div className="flex flex-col gap-1">
                  <input
                     className="border p-2 rounded"
                     type="email"
                     placeholder="이메일"
                     {...register('email')}
                  />
                  {errors.email && (
                     <span className="text-xs text-red-500">
                        {errors.email.message}
                     </span>
                  )}
               </div>

               <div className="flex flex-col gap-1">
                  <input
                     className="border p-2 rounded"
                     type="password"
                     placeholder="비밀번호"
                     {...register('password')}
                  />
                  {errors.password && (
                     <span className="text-xs text-red-500">
                        {errors.password.message}
                     </span>
                  )}
               </div>

               <button
                  type="submit"
                  className="mt-3 p-2 rounded bg-blue-500 text-white hover:bg-blue-600 disabled:bg-blue-300"
                  disabled={isSubmitting}
               >
                  {isSubmitting ? '로그인 중...' : '로그인'}
               </button>
            </form>

            <div className="text-sm flex gap-5">
               <Link
                  className="border p-2 rounded hover:bg-gray-50"
                  href={ROUTE_SIGN}
               >
                  회원가입
               </Link>
               <Link
                  className="border p-2 rounded hover:bg-gray-50"
                  href={ROUTE_FORGET}
               >
                  비밀번호 분실
               </Link>
            </div>
         </div>
      </section>
   )
}
