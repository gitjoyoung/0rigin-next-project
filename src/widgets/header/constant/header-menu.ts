import {
   Blocks,
   Calculator,
   Code,
   FlaskConical,
   ImageIcon,
   Laptop,
   LayoutGrid,
   LucideIcon,
   MessageSquare,
   Newspaper,
   PlusSquare,
} from 'lucide-react'

import { ROUTE_QUIZ, ROUTE_UTILS } from '@/constants/pathname'

export interface SubMenuItem {
   id: string
   title: string
   url: string
   icon: LucideIcon
}

export interface MenuGroup {
   id: string
   title?: string
   items: SubMenuItem[]
}

export interface MenuItem {
   id: string
   title: string
   url?: string
   submenuGroups?: MenuGroup[]
}

export const HEADER_NAV_LIST: MenuItem[] = [
   {
      id: 'board',
      title: '게시판',
      submenuGroups: [
         {
            id: 'board-group-1',
            title: '주제별 게시판',
            items: [
               {
                  id: 'philosophy',
                  title: '철학 게시판',
                  url: '/board/philosophy',
                  icon: Code,
               },
               {
                  id: 'technology',
                  title: '기술 게시판',
                  url: '/board/technology',
                  icon: MessageSquare,
               },

               {
                  id: 'science',
                  title: '과학 게시판',
                  url: '/board/science',
                  icon: FlaskConical,
               },
               {
                  id: 'mathematics',
                  title: '수학 게시판',
                  url: '/board/mathematics',
                  icon: Calculator,
               },
            ],
         },
         {
            id: 'board-group-2',
            title: '최신글 게시판',
            items: [
               {
                  id: 'latest',
                  title: '최신글 게시판',
                  url: '/board/latest',
                  icon: Newspaper,
               },
            ],
         },
      ],
   },
   {
      id: 'quiz',
      title: '퀴즈',
      submenuGroups: [
         {
            id: 'quiz-group-1',
            items: [
               {
                  id: 'all-quiz',
                  title: '전체 퀴즈',
                  url: ROUTE_QUIZ,
                  icon: LayoutGrid,
               },
               {
                  id: 'programming',
                  title: '프로그래밍',
                  url: '/quiz/programming',
                  icon: Laptop,
               },
               {
                  id: 'science',
                  title: '과학',
                  url: '/quiz/science',
                  icon: FlaskConical,
               },
            ],
         },
         {
            id: 'quiz-group-2',
            title: '퀴즈 활동',
            items: [
               {
                  id: 'create-quiz',
                  title: '퀴즈 만들기',
                  url: '/quiz/create',
                  icon: PlusSquare,
               },
            ],
         },
      ],
   },
   {
      id: 'utils',
      title: '유틸리티',
      submenuGroups: [
         {
            id: 'utils-group-1',
            items: [
               {
                  id: 'all-utils',
                  title: '전체 유틸리티',
                  url: ROUTE_UTILS,
                  icon: Blocks,
               },
               {
                  id: 'image-converter',
                  title: '이미지 변환기',
                  url: '/utils/image-converter',
                  icon: ImageIcon,
               },
            ],
         },
      ],
   },
]
