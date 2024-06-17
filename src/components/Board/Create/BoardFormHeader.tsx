'use client'

import React from 'react'
import BoardSubjectInput from './BoardSubjectInput'
import { useSession } from 'next-auth/react'
import InputPasswordBox from '@/components/common/inputs/InputPasswordBox'
import InputNickName from '@/components/common/inputs/InputIdBox'

interface Props {
   editData: { title: string }
   email?: string
}

export default function BoardFormHeader({ editData, email = null }: Props) {
   return (
      <>
         <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
            <InputNickName
               name="nickname"
               placeholder={email || '닉네임'}
               defaultValue={email || ''}
               disabled={!!email}
            />
            {email ? (
               <p className="text-blue-600">로그인 상태</p>
            ) : (
               <InputPasswordBox name="password" placeholder="패스워드" />
            )}
         </div>
         {/* 제목 */}
         <BoardSubjectInput name="subject" title={editData?.title} />
      </>
   )
}
