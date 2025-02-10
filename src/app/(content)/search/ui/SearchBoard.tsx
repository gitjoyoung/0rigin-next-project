import { ROUTES } from '@/constants/route'
import { fetchSearchStorage } from '@/service/search/fetchSearchStorage'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
   keyword: string
}

export default async function SearchBoard({ keyword }: Props) {
   const result = await fetchSearchStorage(keyword)
   const resultJson = await result.json()
   return (
      <article>
         {' '}
         <div className="flex flex-col py-2  overflow-hidden whitespace-nowrap  ">
            <h2 className="p-1 font-bold text-xl ">
               게시판 검색결과 {resultJson.length} 건
            </h2>
         </div>
         {resultJson.length > 0 ? (
            resultJson.map((data) => (
               <li className=" border p-2 flex gap-3" key={data.id}>
                  <div
                     className="border border-black min-w-[100px] min-h-[100px]
      items-center flex relative"
                  >
                     <Image
                        src={data?.thumbnail || '/mascot/winksaurus3.png'}
                        fill
                        alt={data.title}
                        className="object-cover"
                     />
                  </div>
                  <div className=" p-1 flex flex-col gap-2">
                     <Link href={`${ROUTES.BOARD}/1/${data.id}`}>
                        <h1 className="line-clamp-1  text-base font-semibold whitespace-pre overflow-hidden ">
                           {data.title}
                        </h1>
                        <p className="line-clamp-3 text-sm">
                           {data.summary || ''}
                        </p>
                     </Link>
                  </div>
               </li>
            ))
         ) : (
            <h1 className="p-1">{resultJson}</h1>
         )}
      </article>
   )
}
