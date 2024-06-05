import Radio from '@/components/common/Input/Radio'
import React from 'react'

export default function GenderRadioGroup() {
   const GENDER_ARRAY = [
      {
         id: 'gender-man',
         name: 'gender',
         value: '남자',
      },
      {
         id: 'gender-girl',
         name: 'gender',
         value: '여자',
      },
      {
         id: 'gender-other',
         name: 'gender',
         value: '기타',
      },
   ]

   return (
      <div className="border p-1 py-2 flex flex-col gap-2">
         <Radio arr={GENDER_ARRAY} />
         <p className="text-xs ">* 성별을 선택해 주세요</p>
      </div>
   )
}
