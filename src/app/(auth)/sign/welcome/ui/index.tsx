import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'

export default async function WelcomePage({
   userEmail,
}: {
   userEmail: string
}) {
   return (
      <div className="min-h-72 flex flex-col items-center justify-center px-2">
         <div className="max-w-md w-full space-y-8 p-8 rounded-lg">
            <div className="text-center">
               <h2 className="text-2xl font-bold tracking-tight">
                  {userEmail} 님!
               </h2>
               <h2 className="mt-6 text-3xl font-extrabold">
                  회원가입을 축하합니다! 🎉
               </h2>
               <p className="mt-2 text-sm">
                  이제 0rigin의 모든 기능을 사용하실 수 있습니다.
               </p>
            </div>

            <div className="mt-8 space-y-4">
               <Button asChild className="w-full">
                  <Link href="/">홈으로 가기</Link>
               </Button>
            </div>
         </div>
      </div>
   )
}
