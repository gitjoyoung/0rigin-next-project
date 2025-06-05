'use client'

import { getUser } from '@/entities/auth/api/get-user'
import {
   ROUTE_LOGIN,
   ROUTE_MY_PAGE,
   ROUTE_SIGN,
} from '@/shared/constants/pathname'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import type { User } from '@supabase/supabase-js'
import { useMutation } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

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
   onClick?: () => void
}

export default function AuthButtons({ onClick }: AuthButtonsProps) {
   const [user, setUser] = useState<User | null>(null)
   const [loading, setLoading] = useState(true)
   const [isLoggingOut, setIsLoggingOut] = useState(false)
   const router = useRouter()
   const supabase = SupabaseBrowserClient()

   useEffect(() => {
      const fetchUser = async () => {
         try {
            const userData = await getUser()
            setUser(userData)
         } catch (error) {
            console.error('Failed to fetch user:', error)
         } finally {
            setLoading(false)
         }
      }

      fetchUser()

      // 세션 상태 변경을 실시간으로 감지
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
         console.log('Auth state changed:', event, session?.user?.email)

         if (event === 'SIGNED_IN') {
            setUser(session?.user ?? null)
            setIsLoggingOut(false)
         } else if (event === 'SIGNED_OUT') {
            setUser(null)
            setIsLoggingOut(false)
         }
      })

      return () => subscription.unsubscribe()
   }, [supabase.auth])

   const isAuthenticated = !!user

   const { mutate: logout, isPending: isLogoutPending } = useMutation({
      mutationFn: async () => {
         setIsLoggingOut(true)

         const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         })

         if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message)
         }

         return response.json()
      },
      onSuccess: () => {
         // 로그아웃 성공 시 즉시 사용자 상태를 null로 설정
         setUser(null)
         onClick?.()

         // 페이지 새로고침 없이 홈으로 이동만
         router.push('/')
      },
      onError: (error) => {
         console.error('클라이언트 로그아웃 에러:', error)
         alert('로그아웃 처리 중 오류가 발생했습니다.')
         setIsLoggingOut(false)
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

   // 로그아웃 중이거나 로딩 중일 때 처리
   if (loading && !isLoggingOut) {
      return (
         <div className="flex gap-2">
            <div className="w-16 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
            <div className="w-20 h-8 bg-gray-200 dark:bg-gray-700 animate-pulse rounded" />
         </div>
      )
   }

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
