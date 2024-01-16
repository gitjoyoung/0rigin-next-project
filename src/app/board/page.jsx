"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import BoardList from "@/components/Board/BoradList";
import Pagination from "@/components/Board/Pagination";

export default function page() {
  const [boardRes, setBoardRes] = useState([]);
  const router = useRouter();
  const options = {
    url: `${process.env.NEXT_PUBLIC_API_URL}board`, // 오타 수정: "borad" -> "board"
    method: "get",
  };

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios(options);
        setBoardRes(response.data);
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    fetchBoardData();
  }, []);

  const TemporaryPaginationData = {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page) => {
      console.log(`Page changed to: ${page}`);
      // 원하는 페이지 변경 처리 로직을 추가할 수 있습니다.
    },
  };
  return (
    <div className="p-1">
      <h1 className="text-4xl"> 왁자지껄 게시판</h1>

      <div className="flex justify-between mt-2 mb-2">
        <button onClick={() => router.refresh()}>목록</button>
        <button onClick={() => router.push("/board/create/any")}>글쓰기</button>
      </div>
      <div className="border border-black">
        {Array.isArray(boardRes) &&
          boardRes.map((item , no) => <BoardList key={no} {...item} />)}
      </div>
      <div className="flex justify-center">
        <Pagination {...TemporaryPaginationData} />
      </div>
    </div>
  );
}
