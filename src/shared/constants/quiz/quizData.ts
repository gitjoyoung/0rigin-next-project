import { computerScienceQuestions } from './computerScienceQuestions'
import { philosophyQuestions } from './philosophyQuestions'
import { programmingQuestions } from './programmingQuestions'
import { scienceQuestions } from './scienceQuestions'

export const QUIZ_DATA = [
   {
      name: '철학 퀴즈',
      path: 'philosophy',
      description: '철학에 대한 기본적인 지식을 테스트합니다.',
      data: philosophyQuestions,
   },
   {
      name: '과학 퀴즈',
      path: 'science',
      description: '자연과학의 다양한 분야를 다룹니다.',
      data: scienceQuestions,
   },
   {
      name: '컴퓨터 퀴즈',
      path: 'computer',
      description: '컴퓨터 과학의 기본 개념을 점검합니다.',
      data: computerScienceQuestions,
   },
   {
      name: '프로그래밍 퀴즈',
      path: 'programming',
      description: '다양한 프로그래밍 언어와 기법을 평가합니다.',
      data: programmingQuestions,
   },
]
