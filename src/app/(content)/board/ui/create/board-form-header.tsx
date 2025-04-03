'use client'
import { Input } from '@/shared/shadcn/ui/input'
interface Props {
   editData: { title: string }
   email?: string
}

export default function BoardFormHeader({ editData, email = null }: Props) {
   return (
      <>
         <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
            <Input
               name="nickname"
               placeholder={email || '닉네임'}
               defaultValue={email || ''}
               disabled={!!email}
            />
            {email ? (
               <p className="text-blue-600">로그인 상태</p>
            ) : (
               <Input name="password" placeholder="패스워드" type="password" />
            )}
         </div>
         {/* 제목 */}
         <Input name="subject" title={editData?.title} />
      </>
   )
}
