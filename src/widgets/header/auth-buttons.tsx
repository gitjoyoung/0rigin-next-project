'use client'

import { signOut } from '@/entities/auth/api/sign-out'
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
   type?: 'submit'
   disabled?: boolean
}

function AuthButton({ href, children, type, ...props }: AuthButtonProps) {
   return (
      <Button
         {...props}
         size="sm"
         asChild={!!href}
         variant="outline"
         className={`dark:bg-white bg-black text-white dark:text-black`}
         type={type}
      >
         {href ? <Link href={href}>{children}</Link> : children}
      </Button>
   )
}

interface AuthButtonsProps {
   session: any
   onClick?: () => void
}

export default function AuthButtons({ session, onClick }: AuthButtonsProps) {
   const isAuthenticated = !!session

   const { mutate: logout, isPending: isLogoutPending } = useMutation({
      mutationFn: async () => {
         await signOut()
      },
      onSuccess: () => {
         onClick?.()
         window.location.href = '/'
      },
      onError: (error) => {
         console.error('클라이언트 로그아웃 에러:', error)
         alert('로그아웃 처리 중 오류가 발생했습니다.')
      },
   })

   const guestButtons = [
      { label: '로그인', href: ROUTE_LOGIN },
      { label: '회원가입', href: ROUTE_SIGN },
   ]

   const authButtons = [
      {
         label: isLogoutPending ? '처리 중...' : '로그아웃',
         onClick: () => logout(),
      },
      { label: '마이페이지', href: ROUTE_MY_PAGE },
   ]

   const buttonsToRender = isAuthenticated ? authButtons : guestButtons

   return (
      <section className="flex items-end gap-5">
         <div className="flex gap-2 text-xs">
            {buttonsToRender.map((btn, i) => (
               <AuthButton
                  key={i}
                  href={btn.href}
                  onClick={btn.onClick ?? onClick}
                  disabled={isLogoutPending}
               >
                  {btn.label}
               </AuthButton>
            ))}
         </div>
      </section>
   )
}
