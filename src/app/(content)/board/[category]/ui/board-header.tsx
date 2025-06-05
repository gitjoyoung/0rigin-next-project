import { Button } from '@/shared/shadcn/ui/button'
import Link from 'next/link'
import type { ICategory } from '../types/category-type'

// 헤더에서 필요한 최소한의 카테고리 정보

interface Props {
   category: Partial<ICategory>
}

export default function BoardHeader({ category }: Props) {
   const { slug, name, description } = category

   // 실제 DB 카테고리인지 확인 (id 필드 존재 여부로 판단)
   const isRealCategory = 'id' in category && category.id

   return (
      <article className="my-4 px-1 flex justify-between items-center border-b border-slate-200 pb-4">
         <div className="space-y-1">
            <Link href={`/board/${slug}`}>
               <h1 className="text-2xl font-bold tracking-tight hover:text-slate-700 transition-colors">
                  {name}
               </h1>
            </Link>
            <p className="text-sm text-muted-foreground">{description}</p>
         </div>
         {isRealCategory && (
            <Link href={`/board/${slug}/create`}>
               <Button variant="default" className="p-4" size="default">
                  글쓰기
               </Button>
            </Link>
         )}
      </article>
   )
}
