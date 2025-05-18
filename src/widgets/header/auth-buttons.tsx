'use client'
import {
   ROUTE_LOGIN,
   ROUTE_MY_PAGE,
   ROUTE_SIGN,
} from '@/shared/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'

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
   children,
   className = '',
   type,
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
      >
         {href ? <Link href={href}>{children}</Link> : children}
      </Button>
   )
}

// 로그아웃 API 요청 함수
const fetchLogout = async () => {
   const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + '/api/auth/logout',
      {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
      },
   )
   return response.json()
}

interface AuthButtonsProps {
   session: any
   onClick?: () => void
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
