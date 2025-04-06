import { Badge } from '@/shared/shadcn/ui/badge'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { ScrollArea } from '@/shared/shadcn/ui/scroll-area'
import CustomPagination from '../../board/ui/pagination/custom-pagination'

interface SearchBoardProps {
   searchResult: any[]
}

export default async function SearchBoard({ searchResult }: SearchBoardProps) {
   if (!searchResult) {
      return (
         <Card className="w-full">
            <CardContent className="text-center py-8 text-muted-foreground">
               검색 결과가 없습니다.
            </CardContent>
         </Card>
      )
   }

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               검색결과{' '}
               <Badge variant="secondary">{searchResult.length || 0}건</Badge>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ScrollArea className="h-[600px] w-full pr-4">
               {searchResult && searchResult.length > 0 ? (
                  <div className="space-y-4">
                     {/* {searchResult.map((data) => (
                        <Card key={data.id} className="overflow-hidden">
                           <Link href={`${ROUTES.BOARD}/${data.id}`}>
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
                                       <span>
                                          조회수: {data.view_count || 0}
                                       </span>
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
                     ))} */}
                  </div>
               ) : (
                  <div className="text-center py-8 text-muted-foreground">
                     <p className="text-lg mb-2">검색 결과가 없습니다</p>
                     <p className="text-sm">다른 검색어로 다시 시도해보세요.</p>
                  </div>
               )}
            </ScrollArea>
            <div className="mt-4">
               <CustomPagination currentPage={1} />
            </div>
         </CardContent>
      </Card>
   )
}
