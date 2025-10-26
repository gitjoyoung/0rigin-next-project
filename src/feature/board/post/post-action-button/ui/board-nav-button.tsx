"use client";
import { ROUTE_BOARD } from "@/constants/pathname";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  postID: string;
}

export default function BoardNavButton({ postID }: Props) {
  const [search, setSearch] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setSearch(Number(searchParams.get("search")) || 1);
  }, []);

  return (
    <div className="flex justify-between p-1 items-center my-3">
      <Link href={`${ROUTE_BOARD}/${Number(postID) - 1}?page=${search || 1}`}>
        이전 글
      </Link>
      <Link href={`${ROUTE_BOARD}`}>목록</Link>
      <Link href={`${ROUTE_BOARD}/${Number(postID) + 1}?page=${search || 1}`}>
        다음 글
      </Link>
    </div>
  );
}
