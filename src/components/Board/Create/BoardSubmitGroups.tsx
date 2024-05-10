import BasicButton from '@/components/common/Button/basicButton'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function BoardSubmitGroups() {
   const { back } = useRouter()
   return (
      <div className="flex gap-6 justify-end my-2">
         <BasicButton label="취소 하기" type="button" onClick={() => back()} />
         <BasicButton type="submit" label="제출 하기" />
      </div>
   )
}
