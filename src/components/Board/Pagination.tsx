'use client'

import React, { useEffect, useState } from 'react'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ROUTES } from '@/constants/route'
import { validateSlug } from '@/utils/slugValidators/slug'
import { fetchLatestPostId } from '@/app/api/board/post/fetchPostApi'
import { v4 as uuid } from 'uuid'

export default function Pagination() {
   // 마지막 게시글 id 가져오기 id 가 index 이므로 1부터 시작
   const [lastPostId, setLastPostId] = useState(0)
   useEffect(() => {
      async function fetchData() {
         const fetchedLastPostId = await fetchLatestPostId()
         setLastPostId(fetchedLastPostId)
      }
      fetchData()
   }, [])

   // 페이지 정보
   const searchParams = useSearchParams()
   const page = validateSlug(searchParams.get('page'))
      ? Number(searchParams.get('page'))
      : 1

   // 페이지 그룹
   const POSTS_PER_PAGE = 20 // 한 페이지에 보여줄 게시글 수
   const PAGES_PER_GROUP = 5 // 한 페이지 그룹에 보여줄 페이지 수

   const totalPages = Math.ceil(lastPostId / POSTS_PER_PAGE) // 전체 페이지 계산
   const currentPageGroup = Math.ceil(page / PAGES_PER_GROUP) // 현재 페이지 그룹
   const startPage = (currentPageGroup - 1) * PAGES_PER_GROUP + 1 // 시작 페이지
   const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages) // 끝 페이지
   const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
   ) // 페이지 번호 배열

   // 페이지 이동
   const router = useRouter()
   const handlePageChange = (selectPage) => {
      router.push(`${ROUTES.BOARD}?page=${selectPage}`)
   }

   return (
      <div className="flex justify-center items-center gap-2 m-2 overflow-x-auto">
         {/* 이전 페이지 그룹 버튼 */}
         {startPage > 1 && (
            <button
               type="button"
               className="border-none"
               onClick={() => handlePageChange(startPage - PAGES_PER_GROUP)}
               aria-label="Previous Page Group"
            >
               <FontAwesomeIcon icon={faCaretLeft} />
            </button>
         )}

         {/* 현재 페이지 번호 */}
         {pageNumbers.map((index: number) => (
            <div key={uuid()} className="mx-1">
               {page === index ? (
                  <p className="underline p-1 text-blue-600">{index}</p>
               ) : (
                  <Link
                     href={`${ROUTES.BOARD}?page=${index}`}
                     type="button"
                     className="border-none"
                  >
                     {index}
                  </Link>
               )}
            </div>
         ))}

         {/* 다음 페이지 그룹 버튼 */}
         {endPage < totalPages && (
            <button
               type="button"
               className="border-none"
               onClick={() => handlePageChange(endPage + 1)}
               aria-label="Next Page Group"
            >
               <FontAwesomeIcon icon={faCaretRight} />
            </button>
         )}
      </div>
   )
}
