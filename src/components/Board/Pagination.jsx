import Link from "next/link";
import React from "react";

export default function Pagination(props) {
  const { currentPage, totalPages, onPageChange } = props;
  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <div></div>
      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (page) => (
          <div key={page}>
            {currentPage === page ? (
              <button>{page}</button>
            ) : (
              <Link href={`/board/${page}`} onClick={() => onPageChange(page)}>
                {page}
              </Link>
            )}
          </div>
        )
      )}
    </div>
  );
}
