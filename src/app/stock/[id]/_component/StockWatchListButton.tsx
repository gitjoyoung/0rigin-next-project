import React from 'react'

interface Props {
   data: any
}
export default function StockWatchListButton({ data }: Props) {
   const handelAddFavor = () => {}
   
   return (
      <button className="bg-black text-white" onClick={handelAddFavor}>
         + 관심종목 추가
      </button>
   )
}
