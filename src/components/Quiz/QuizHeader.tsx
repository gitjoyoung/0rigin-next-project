import React from 'react'
import { ROUTES } from '@/constants/route'
import CustomTitle from '../common/CustomTitle'

export default function QuizHeader() {
   return (
      <CustomTitle
         title="QuizTitle"
         subTitle="재밌있는 퀴즈를 풀어풀세요"
         link={ROUTES.QUIZ}
      />
   )
}
