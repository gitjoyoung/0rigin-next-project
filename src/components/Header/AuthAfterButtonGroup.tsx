'use client'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/route'
import { signOut, useSession } from 'next-auth/react'
interface Props {
   email?: string
}
export default function AuthAfterButtonGroup({ email }: Props) {
   const { push } = useRouter()

   return (
      <div className="flex-col gap-1 ">
         <p className="m-1 text-xs">{email}</p>
         <div className="flex gap-2 text-xs">
            <button
               type="button"
               onClick={() => signOut({ callbackUrl: '/' })}
               className="btn-login"
            >
               로그아웃
            </button>
            <button
               type="button"
               onClick={() => push(ROUTES.MYPAGE)}
               className="btn-sighup"
            >
               마이페이지
            </button>
         </div>
      </div>
   )
}
