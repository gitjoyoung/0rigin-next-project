'use client'

import { ROUTE_QUIZ } from '@/constants/pathname'
import { Quiz } from '@/entities/quiz/api/quiz-api'
import { Button } from '@/shared/shadcn/ui/button'
import { Input } from '@/shared/shadcn/ui/input'
import { Separator } from '@/shared/shadcn/ui/separator'
import QuizBoardList from '@/widgets/quiz/ui/quiz-board-list'
import { Plus, Search } from 'lucide-react'
import Link from 'next/link'
import { useMemo, useState } from 'react'

interface Props {
   quizList: Quiz[]
}

export default function QuizBoard({ quizList }: Props) {
   const [search, setSearch] = useState('')
   const filteredList = useMemo(() => {
      if (!search.trim()) return quizList
      const keyword = search.trim().toLowerCase()
      return quizList.filter(
         (q) =>
            q.title.toLowerCase().includes(keyword) ||
            (q.description?.toLowerCase().includes(keyword) ?? false),
      )
   }, [search, quizList])

   return (
      <main className="space-y-6" role="main" aria-label="퀴즈 페이지">
         {/* 헤더 섹션 */}
         <header className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
               <div>
                  <Link
                     href={ROUTE_QUIZ}
                     className="text-2xl font-semibold text-gray-900 dark:text-white "
                     aria-label="퀴즈 페이지 메인으로 이동"
                  >
                     퀴즈
                  </Link>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                     다양한 주제의 퀴즈를 풀어보세요
                  </p>
               </div>
               <Button asChild size="sm">
                  <Link
                     href={'/quiz/create'}
                     className="flex items-center gap-2"
                     aria-label="새로운 퀴즈 만들기"
                  >
                     <Plus className="w-4 h-4" aria-hidden="true" />
                     퀴즈 만들기
                  </Link>
               </Button>
            </div>

            {/* 검색 섹션 */}
            <div className="max-w-xs" role="search" aria-label="퀴즈 검색">
               <div className="relative">
                  <Search
                     className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
                     aria-hidden="true"
                  />
                  <Input
                     placeholder="퀴즈 검색..."
                     className="pl-10 h-9 text-sm border-gray-200 dark:border-gray-700"
                     aria-label="퀴즈 검색"
                     type="search"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                  />
               </div>
            </div>
         </header>

         <Separator
            className="border-gray-200 dark:border-gray-700"
            role="separator"
            aria-orientation="horizontal"
         />

         <QuizBoardList quizList={filteredList} />
      </main>
   )
}
