import React from 'react'
import { ROUTES } from '@/constants/route'
import CustomTitle from '@/components/common/links/CustomTitleLink'


export default function QuizHeader() {
   return (
      <CustomTitle
         title="QuizTitle"
         subTitle="재밌있는 퀴즈를 풀어 보세요"
         link={ROUTES.QUIZ}
      />
   )
}
