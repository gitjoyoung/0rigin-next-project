'use client'
import {
   ROUTE_LOGIN,
   ROUTE_MY_PAGE,
   ROUTE_SIGN,
} from '@/shared/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import type { Session } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'

interface AuthButtonsProps {
   session: Session | null
   className?: string
   onClick?: () => void
}

interface AuthButtonProps {
   href?: string
   onClick?: () => void
   children: React.ReactNode
   className?: string
   type?: 'submit'
   disabled?: boolean
}

function AuthButton({
   href,
   onClick,
   children,
   className = '',
   type,
   disabled,
   ...props
}: AuthButtonProps) {
   return (
      <Button
         {...props}
         size="sm"
         asChild={!!href}
         variant="outline"
         className={`dark:bg-white bg-black text-white dark:text-black ${className}`}
         type={type}
         onClick={onClick}
         disabled={disabled}
      >
         {href ? <Link href={href}>{children}</Link> : children}
      </Button>
   )
}

// 로그아웃 API 요청 함수
const fetchLogout = async () => {
   try {
      const response = await fetch(
         process.env.NEXT_PUBLIC_API_URL + '/api/auth/logout',
         {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         },
      )

      const result = await response.json()

      if (!response.ok) {
         return {
            success: false,
            message: result.message || '로그아웃 중 오류가 발생했습니다.',
         }
      }

      return result
   } catch (error) {
      return {
         success: false,
         message:
            error instanceof Error
               ? error.message
               : '로그아웃 처리 중 오류가 발생했습니다.',
      }
   }
}

export default function AuthButtons({ session, onClick }: AuthButtonsProps) {
   const isAuthenticated = !!session

   // 로그아웃 뮤테이션
   const { mutate: logout, isPending: isLogoutPending } = useMutation({
      mutationFn: fetchLogout,
      onSuccess: (data) => {
         if (data.success) {
            onClick?.()
            window.location.reload()
         } else {
            alert(data.message || '로그아웃 중 오류가 발생했습니다.')
         }
      },
      onError: (error) => {
         console.error('로그아웃 중 오류:', error)
         alert('로그아웃 처리 중 오류가 발생했습니다.')
      },
   })

   return (
      <section className="flex items-end gap-5">
         {!isAuthenticated ? (
            <div className="flex gap-2 text-xs">
               <AuthButton href={ROUTE_LOGIN} onClick={onClick}>
                  로그인
               </AuthButton>
               <AuthButton href={ROUTE_SIGN} onClick={onClick}>
                  회원가입
               </AuthButton>
            </div>
         ) : (
            <div className="flex gap-2 text-xs">
               <AuthButton onClick={() => logout()} disabled={isLogoutPending}>
                  {isLogoutPending ? '처리 중...' : '로그아웃'}
               </AuthButton>
               <AuthButton
                  href={ROUTE_MY_PAGE}
                  onClick={onClick}
                  disabled={isLogoutPending}
               >
                  마이페이지
               </AuthButton>
            </div>
         )}
      </section>
   )
}
