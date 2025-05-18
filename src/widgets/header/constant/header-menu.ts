import {
   ROUTE_BOARD,
   ROUTE_QUIZ,
   ROUTE_UTILS,
} from '@/shared/constants/pathname'

export const HEADER_NAV_LIST = [
   {
      id: 'board',
      title: '게시판',
      url: ROUTE_BOARD,
   },
   {
      id: 'quiz',
      title: '퀴즈',
      url: ROUTE_QUIZ,
   },
   {
      id: 'utils',
      title: '유틸리티',
      url: ROUTE_UTILS,
   },
]
