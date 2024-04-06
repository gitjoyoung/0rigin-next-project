import React from 'react'
import { ROUTES } from '@/constants/route'
import CustomTilte from '../common/CustomTitle'

export default function QuizHeader() {
   return (
      <CustomTilte
         title="QuizTitle"
         subTitle="재밌있는 퀴즈를 풀어풀세요"
         link={ROUTES.QUIZ}
      />
   )
}
