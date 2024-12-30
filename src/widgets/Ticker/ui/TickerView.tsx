import { TickerCounts } from '../model/types'
import TickerList from './TickerList'

interface TickerViewProps {
   initialData: TickerCounts
}

export default function TickerView({ initialData }: TickerViewProps) {
   return (
      <aside className="relative bg-black text-white text-xs w-full">
         <div className="flex w-full justify-end items-center">
            <TickerList counts={initialData} />
         </div>
      </aside>
   )
}
