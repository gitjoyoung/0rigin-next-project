import Skeleton from '../common/skeleton/Skeleton'

export default function BoardSkeleton() {
   return (
      <div className="space-y-1">
         <div className="flex gap-1">
            <Skeleton className="w-[65px] h-[41px]" />
            <Skeleton className="w-[65px] h-[41px]" />
         </div>
         <Skeleton className="w-full h-[53px]" />
         <Skeleton className="w-full h-[53px]" />
         <Skeleton className="w-full h-[53px]" />
         <Skeleton className="w-full h-[53px]" />
         <Skeleton className="w-full h-[53px]" />
         <Skeleton className="w-full h-[66px]" />
      </div>
   )
}
