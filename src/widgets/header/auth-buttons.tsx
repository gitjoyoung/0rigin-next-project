import { signOut } from '@/shared/actions/auth-action'
import {
   ROUTE_LOGIN,
   ROUTE_MY_PAGE,
   ROUTE_SIGN,
} from '@/shared/constants/pathname'
import { Button } from '@/shared/shadcn/ui/button'
import type { Session } from '@supabase/supabase-js'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'

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
}

function AuthButton({
   href,
   onClick,
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
         onClick={onClick}
      >
         {href ? <Link href={href}>{children}</Link> : children}
      </Button>
   )
}

export default function AuthButtons({ session, onClick }: AuthButtonsProps) {
   const isAuthenticated = !!session
   const router = useRouter()

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
               <AuthButton
                  type="submit"
                  onClick={async () => {
                     await signOut()
                     onClick?.()
                     redirect('/')
                  }}
               >
                  로그아웃
               </AuthButton>
               <AuthButton href={ROUTE_MY_PAGE} onClick={onClick}>
                  마이페이지
               </AuthButton>
            </div>
         )}
      </section>
   )
}
