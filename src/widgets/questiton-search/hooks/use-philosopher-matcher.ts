import { useCallback, useState } from 'react'
import { PHILOSOPHERS } from '../constants/philosophers'
import type { MatchingResult, RelatedPost, SearchState } from '../types'

// 더미 관련 게시글 데이터
const DUMMY_POSTS: Record<string, RelatedPost[]> = {
   '삶의 의미': [
      {
         id: 1,
         title: '소크라테스의 삶의 의미에 대한 탐구',
         content:
            '소크라테스가 말하는 검토된 삶의 가치에 대해 알아보겠습니다...',
         category: '철학',
         url: '/board/philosophy/1',
      },
      {
         id: 2,
         title: '니체의 영원회귀와 삶의 의미',
         content:
            '니체의 영원회귀 사상이 현대인의 삶에 주는 의미를 탐구합니다...',
         category: '철학',
         url: '/board/philosophy/2',
      },
   ],
   행복: [
      {
         id: 3,
         title: '아리스토텔레스의 행복론',
         content: '아리스토텔레스가 정의한 진정한 행복의 의미를 살펴봅니다...',
         category: '철학',
         url: '/board/philosophy/3',
      },
   ],
   자유: [
      {
         id: 4,
         title: '사르트르의 실존적 자유',
         content: '사르트르가 말하는 인간의 자유와 책임에 대해 생각해봅니다...',
         category: '철학',
         url: '/board/philosophy/4',
      },
   ],
}

export function usePhilosopherMatcher() {
   const [searchState, setSearchState] = useState<SearchState>({
      query: '',
      isSearching: false,
      results: [],
      selectedResult: null,
   })

   // 키워드 매칭 점수 계산
   const calculateRelevanceScore = useCallback(
      (query: string, philosopher: (typeof PHILOSOPHERS)[0]) => {
         const queryLower = query.toLowerCase()
         const keywords = philosopher.keywords.map((k) => k.toLowerCase())
         const concerns = philosopher.concerns.map((c) => c.toLowerCase())

         let score = 0
         const matchedKeywords: string[] = []

         // 키워드 매칭
         keywords.forEach((keyword) => {
            if (queryLower.includes(keyword) || keyword.includes(queryLower)) {
               score += 3
               matchedKeywords.push(keyword)
            }
         })

         // 고민 매칭
         concerns.forEach((concern) => {
            if (queryLower.includes(concern) || concern.includes(queryLower)) {
               score += 2
               if (!matchedKeywords.includes(concern)) {
                  matchedKeywords.push(concern)
               }
            }
         })

         // 철학가 이름 매칭
         if (queryLower.includes(philosopher.name.toLowerCase())) {
            score += 5
         }

         // 철학 분야 매칭
         if (queryLower.includes(philosopher.mainPhilosophy.toLowerCase())) {
            score += 1
         }

         // 기본 점수 부여 (검색어가 있으면 최소 1점)
         if (query.trim()) {
            score += 1
         }

         return { score, matchedKeywords }
      },
      [],
   )

   // 관련 게시글 찾기
   const findRelatedPosts = useCallback((query: string): RelatedPost[] => {
      const queryLower = query.toLowerCase()

      // 정확한 매칭
      if (DUMMY_POSTS[query]) {
         return DUMMY_POSTS[query]
      }

      // 키워드 매칭
      for (const [keyword, posts] of Object.entries(DUMMY_POSTS)) {
         if (
            queryLower.includes(keyword.toLowerCase()) ||
            keyword.toLowerCase().includes(queryLower)
         ) {
            return posts
         }
      }

      // 철학가 이름 매칭
      for (const philosopher of PHILOSOPHERS) {
         if (queryLower.includes(philosopher.name.toLowerCase())) {
            return DUMMY_POSTS['삶의 의미'] || []
         }
      }

      return []
   }, [])

   // 철학가 검색 및 매칭
   const searchPhilosophers = useCallback(
      async (query: string) => {
         if (!query.trim()) {
            setSearchState((prev) => ({
               ...prev,
               query: '',
               results: [],
               selectedResult: null,
            }))
            return
         }

         setSearchState((prev) => ({ ...prev, isSearching: true, query }))

         // 실제 API 호출을 시뮬레이션하기 위한 지연
         await new Promise((resolve) => setTimeout(resolve, 300))

         const results: MatchingResult[] = PHILOSOPHERS.map((philosopher) => {
            const { score, matchedKeywords } = calculateRelevanceScore(
               query,
               philosopher,
            )

            return {
               philosopher,
               relevanceScore: score,
               matchedKeywords,
               suggestedAnswer:
                  philosopher.answers[0] ||
                  '해당 철학가의 답변을 찾을 수 없습니다.',
               relatedPosts: findRelatedPosts(query), // 관련 게시글 추가
            }
         })
            .sort((a, b) => b.relevanceScore - a.relevanceScore)
            .slice(0, 3) // 상위 3개 결과만 반환

         setSearchState((prev) => ({
            ...prev,
            results,
            isSearching: false,
            selectedResult: results.length > 0 ? results[0] : null,
         }))
      },
      [calculateRelevanceScore, findRelatedPosts],
   )

   return {
      searchState,
      searchPhilosophers,
   }
}
