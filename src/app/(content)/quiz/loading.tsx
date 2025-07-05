import { Card } from '@/shared/shadcn/ui/card'
import { Skeleton } from '@/shared/shadcn/ui/skeleton'

// 스켈레톤 카드 컴포넌트
function QuizCardSkeleton() {
   return (
      <Card className="h-24">
         <div className="flex p-3 gap-3 h-full items-center">
            <Skeleton className="w-16 h-16 rounded-md flex-shrink-0" />
            <div className="flex-1 min-w-0 space-y-2">
               <Skeleton className="h-4 w-24" />
               <Skeleton className="h-3 w-full" />
            </div>
         </div>
      </Card>
   )
}

export default function QuizLoading() {
   return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
         <div className="container mx-auto px-4 py-6">
            <div className="space-y-8">
               {/* 헤더 스켈레톤 */}
               <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                     <div>
                        <Skeleton className="h-9 w-20 mb-2" />
                        <Skeleton className="h-5 w-48" />
                     </div>
                     <Skeleton className="h-10 w-24" />
                  </div>
                  <Skeleton className="h-10 w-80 max-w-md" />
               </div>

               {/* 구분선 */}
               <div className="border-t border-gray-200 dark:border-gray-700" />

               {/* 퀴즈 카드 스켈레톤 */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Array.from({ length: 6 }).map((_, index) => (
                     <QuizCardSkeleton key={index} />
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}
