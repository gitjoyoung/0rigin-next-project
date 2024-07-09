'use client'

import React, { useEffect, useState } from 'react'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/route'
import { v4 as uuid } from 'uuid'

interface Props {
   pageNum: number
   lastPostId: number
}

export default function Pagination({ pageNum, lastPostId }) {
   const currentPage = Number(pageNum) || 1
   // 페이지 그룹
   const POSTS_PER_PAGE = 20 // 한 페이지에 보여줄 게시글 수
   const PAGES_PER_GROUP = 5 // 한 페이지 그룹에 보여줄 페이지 수

   const totalPages = Math.ceil(lastPostId / POSTS_PER_PAGE) // 전체 페이지 계산
   const currentPageGroup = Math.ceil(pageNum / PAGES_PER_GROUP) // 현재 페이지 그룹

   const startPage = (currentPageGroup - 1) * PAGES_PER_GROUP + 1 // 시작 페이지
   const endPage = Math.min(startPage + PAGES_PER_GROUP - 1, totalPages) // 끝 페이지

   const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
   ) // 페이지 번호 배열

   // 페이지 이동
   const { push } = useRouter()
   const handlePageChange = (selectPage: number) => {
      push(`${ROUTES.BOARD}?page=${selectPage}`)
   }

   return (
      <article className="flex justify-center items-center gap-2 m-2 overflow-x-auto">
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
               {currentPage === index ? (
                  <p className="  text-blue-600 font-bold">{index}</p>
               ) : (
                  <Link
                     href={`${ROUTES.BOARD}?page=${index}`}
                     className="border-none "
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
      </article>
   )
}
