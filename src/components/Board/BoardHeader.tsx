import Link from 'next/link'

export default function BoardHeader({ title }) {
   return (
      <div
         className="my-2 flex  justify-between relative
      items-center  px-1 border-b py-2 border-black"
      >
         <div className="flex-col flex gap-1">
            <Link href="/board" className="text-3xl font-bold">
               {title} 게시판
            </Link>
            <p className="text-sm">재미있는 게시글을 작성해 보세요</p>
         </div>
         <div className=" right-0 border border-black  shadow-md  flex items-center">
            <Link href="/board/create" className="px-4 py-2 font-bold">
               글쓰기
            </Link>
         </div>
      </div>
   )
}
