import React, { useState } from 'react'
import { faCaretLeft, faCaretRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Pagination({ totalPages, onPageChange }) {
   const [currentPage, setCurrentPage] = useState(1)
   const maxPages = 10

   // 현재 페이지 그룹 계산
   const currentPageGroup = Math.ceil(currentPage / maxPages)

   // 시작 페이지 및 끝 페이지 계산
   const startPage = (currentPageGroup - 1) * maxPages + 1
   const endPage = Math.min(startPage + maxPages - 1, totalPages)

   const handlePageChange = (page) => {
      setCurrentPage(page)
      onPageChange(page)
   }

   return (
      <div className="flex justify-center items-center gap-2 m-2 overflow-x-auto">
         {/* 이전 페이지 그룹 버튼 */}
         {startPage > 1 && (
            <button
               type="button"
               className="border-none"
               onClick={() => handlePageChange(startPage - maxPages)}
               aria-label="Previous Page Group"
            >
               <FontAwesomeIcon icon={faCaretLeft} />
            </button>
         )}

         {/* 페이지 번호 */}
         {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i,
         ).map((page) => (
            <div key={page}>
               {currentPage === page ? (
                  <p className="underline p-1 text-blue-600">{page}</p>
               ) : (
                  <button
                     type="button"
                     className="border-none"
                     onClick={() => handlePageChange(page)}
                     aria-label={`Page ${page}`}
                  >
                     {page}
                  </button>
               )}
            </div>
         ))}
         {/* <Link href={`/board/${page}`}>{page}</Link> */}

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
