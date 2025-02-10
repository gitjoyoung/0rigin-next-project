import { ROUTES } from '@/constants/route'
import { fetchSearchStorage } from '@/service/search/fetchSearchStorage'
import { Badge } from '@/shared/shadcn/ui/badge'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { ScrollArea } from '@/shared/shadcn/ui/scroll-area'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
   keyword: string
}

export default async function SearchBoard({ keyword }: Props) {
   const result = await fetchSearchStorage(keyword)
   const resultJson = await result.json()

   return (
      <Card className="w-full">
         <CardHeader>
            <CardTitle className="flex items-center gap-2">
               검색결과 <Badge variant="secondary">{resultJson.length}건</Badge>
            </CardTitle>
         </CardHeader>
         <CardContent>
            <ScrollArea className="h-[600px] w-full pr-4">
               {resultJson.length > 0 ? (
                  <div className="space-y-4">
                     {resultJson.map((data) => (
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
                                 </div>
                              </div>
                           </Link>
                        </Card>
                     ))}
                  </div>
               ) : (
                  <div className="text-center py-8 text-muted-foreground">
                     검색 결과가 없습니다
                  </div>
               )}
            </ScrollArea>
         </CardContent>
      </Card>
   )
}
