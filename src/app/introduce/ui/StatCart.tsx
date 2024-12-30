import { Icons } from '@/shared/ui/icons'

export default function StatCard({ title, count }) {
   return (
      <div className="border rounded-md border-white shadow-lg">
         <div className="p-4 sm:p-6 flex-col  flex-wrap  items-center text-xs sm:text-sm  justify-center">
            <Icons.mapMarkerAlt />
            <div className="flex flex-col ">
               <p>{title}</p>
               <p className="text-lg">{count}</p>
            </div>
         </div>
      </div>
   )
}
