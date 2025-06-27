'use client'

import { ROUTE_LOGIN, ROUTE_MY_PAGE, ROUTE_SIGN } from '@/constants/pathname'
import { useUser } from '@/shared/hooks/auth/use-user'
import { SupabaseBrowserClient } from '@/shared/lib/supabase/supabase-browser-client'
import { Button } from '@/shared/shadcn/ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
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
   const { data: userData, isLoading } = useUser()
   const [isLoggingOut, setIsLoggingOut] = useState(false)
   const queryClient = useQueryClient()
   const supabase = SupabaseBrowserClient()

   const user = userData?.user

   useEffect(() => {
      // 세션 상태 변경을 실시간으로 감지
      const {
         data: { subscription },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
         console.log('Auth state changed:', event, session?.user?.email)

         if (event === 'SIGNED_IN') {
            // 사용자 정보 쿼리 무효화하여 새로고침
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] })
            setIsLoggingOut(false)
         } else if (event === 'SIGNED_OUT') {
            // 모든 auth 관련 쿼리 무효화
            queryClient.invalidateQueries({ queryKey: ['auth'] })
            setIsLoggingOut(false)
         }
      })

      return () => subscription.unsubscribe()
   }, [supabase.auth, queryClient])

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
      onSuccess: async () => {
         try {
            // 1. 모든 React Query 캐시 완전 정리
            queryClient.clear()

            // 2. 로컬 스토리지 정리 (Supabase 관련)
            if (typeof window !== 'undefined') {
               // Supabase 관련 로컬 스토리지 정리
               const keys = Object.keys(localStorage)
               keys.forEach((key) => {
                  if (key.startsWith('sb-') || key.includes('supabase')) {
                     localStorage.removeItem(key)
                  }
               })

               // 세션 스토리지도 정리
               const sessionKeys = Object.keys(sessionStorage)
               sessionKeys.forEach((key) => {
                  if (key.startsWith('sb-') || key.includes('supabase')) {
                     sessionStorage.removeItem(key)
                  }
               })
            }

            // 3. 잠시 대기 후 페이지 이동 (캐시 정리 완료 보장)
            setTimeout(() => {
               onClick?.()
               window.location.href = '/'
            }, 100)
         } catch (error) {
            console.error('로그아웃 후처리 중 오류:', error)
            // 오류가 발생해도 로그아웃은 완료되었으므로 페이지 이동
            setTimeout(() => {
               onClick?.()
               window.location.href = '/'
            }, 100)
         }
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
   if (isLoading && !isLoggingOut) {
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
