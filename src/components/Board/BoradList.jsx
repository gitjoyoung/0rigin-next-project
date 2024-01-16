import Link from "next/link";
import React from "react";

export default function BoardList(props) {
  const { title, timestamp, views, likes, comments, id, nickname } = props;
  return (
    <Link href={`/board/read/${id}`}>
      <div className="border-t flex items-center justify-between flex-wrap  border-black border-dotted border-b-1 p-3">
        <div className="flex">
          <p className="line-clamp-1 font-semibold">{title}</p>
          <span className="text-gray-400 mr-1 ml-1">[{comments}]</span>
        </div>
        <div className="flex flex-wrap">
          <div className="flex gap-2 text-xs text-gray-500">
            닉네임 {nickname}<span>|</span>
            작성일 {timestamp} <span>|</span> 조회 {views}
            <span>|</span> 추천 {likes}
            <span>|</span> 950107
          </div>
        </div>
      </div>
    </Link>
  );
}
