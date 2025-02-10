import { ROUTES } from '@/constants/route'
import { Button } from '@/shared/shadcn/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
   return (
      <div className="flex flex-col items-center mt-[10vh] h-[100vh] w-full">
         <Image
            src="/mascot/winksaurus.png"
            width={200}
            height={200}
            alt="윙크사우로스 이미지"
         />
         <h1 className="lg:text-4xl text-xl  font-bold mb-4">
            404 - 페이지가 없습니다...
         </h1>
         <p className="text-gray-600 mb-8 text-sm">
            죄송합니다. 찾고 계신 페이지가 존재하지 않습니다.
         </p>

         <Link href={ROUTES.HOME}>
            <Button>홈으로 돌아가기 </Button>
         </Link>
      </div>
   )
}
