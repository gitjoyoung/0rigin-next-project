import { ROUTE_BOARD } from '@/constants/pathname'
import { Badge } from '@/shared/shadcn/ui/badge'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import Image from 'next/image'
import Link from 'next/link'

interface SearchBoardProps {
   searchResult: any[]
   keyword: string
   totalCount: number
}

export default async function SearchBoard({
   searchResult,
   keyword,
   totalCount,
}: SearchBoardProps) {
   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               검색결과 <Badge variant="secondary">{totalCount || 0}건</Badge>
            </CardTitle>
         </CardHeader>
         <CardContent>
            {searchResult && searchResult.length > 0 ? (
               <div className="space-y-4">
                  {searchResult.map((data) => (
                     <Card key={data.id} className="overflow-hidden">
                        <Link href={`${ROUTE_BOARD}/${data.id}`}>
                           <div className="flex gap-4 p-4 group hover:bg-slate-50 transition-colors">
                              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border">
                                 <Image
                                    src={
                                       data?.thumbnail ||
                                       '/mascot/winksaurus3.png'
                                    }
                                    fill
                                    alt={data.title}
                                    className="object-cover"
                                 />
                              </div>
                              <div className="flex flex-col gap-2">
                                 <h3 className="font-semibold group-hover:text-blue-600 transition-colors">
                                    {data.title}
                                 </h3>
                                 <p className="text-sm text-muted-foreground line-clamp-2">
                                    {data.summary || ''}
                                 </p>
                                 <div className="flex gap-2 text-xs text-muted-foreground">
                                    <span>조회수: {data.view_count || 0}</span>
                                    <span>
                                       작성일:{' '}
                                       {new Date(
                                          data.created_at,
                                       ).toLocaleDateString()}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </Link>
                     </Card>
                  ))}
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                  <span className="text-md mb-2 flex">
                     <p className="text-bold text-black">{keyword}</p>
                     와(과) 검색 결과가 없습니다
                  </span>
                  <p className="text-sm">다른 검색어로 다시 시도해보세요.</p>
               </div>
            )}
         </CardContent>
      </Card>
   )
}
