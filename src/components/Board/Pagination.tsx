'use client'

import React from 'react'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ROUTES } from '@/constants/route'

export default function Pagination({ page, lastpostId }) {
   const totalPages = Math.ceil(lastpostId / 20)
   // 페이지 구룹 몇개씩 보여줄 것인지
   const MAX_PAGE = 5
   // 현재 페이지 그룹 계산 ceil : 올림 현재 페이지 / 전체 페이지
   const currentPageGroup = Math.ceil(page / MAX_PAGE)
   // 시작 페이지 및 끝 페이지 계산
   const startPage = (currentPageGroup - 1) * MAX_PAGE + 1
   const endPage = Math.min(startPage + MAX_PAGE - 1, totalPages)
   const pageNumbers = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
   )

   const router = useRouter()

   // 페이지 이동
   const handlePageChange = (selectPage) => {
      router.push(`${ROUTES.BOARD}/${selectPage}`)
   }

   return (
      <div className="flex justify-center items-center gap-2 m-2 overflow-x-auto">
         {/* 이전 페이지 그룹 버튼 */}
         {startPage > 1 && (
            <button
               type="button"
               className="border-none"
               onClick={() => handlePageChange(startPage - MAX_PAGE)}
               aria-label="Previous Page Group"
            >
               <FontAwesomeIcon icon={faCaretLeft} />
            </button>
         )}

         {/* 페이지 번호 */}
         {pageNumbers.map((index: number) => (
            <div key={`${index}PAGE`} className="mx-1">
               {page === index ? (
                  <p className="underline p-1 text-blue-600">{index}</p>
               ) : (
                  <Link
                     href={`${ROUTES.BOARD}/${index}`}
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
