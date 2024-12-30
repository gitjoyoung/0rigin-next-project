import { TickerCounts } from '../model/types'
import TickerItem from './TickerItem'

interface TickerListProps {
   counts: TickerCounts
}

export default function TickerList({ counts }: TickerListProps) {
   return (
      <ul className="flex py-0.5 [&>*+*]:ml-2">
         <TickerItem label="방문자" value={counts.visit} />
         <TickerItem label="게시글" value={counts.post} />
         <TickerItem label="회원 수" value={counts.user} />
      </ul>
   )
}
