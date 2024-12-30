import { TickerCounts } from '@/types/tickerTypes'
import StatCard from './StatCart'

interface Props {
   counts: TickerCounts
}

export default function CommunityStats({ counts }: Props) {
   const stats = [
      {
         id: 'posts_and_comments',
         title: '게시글',
         count: counts?.post,
      },
      {
         id: 'members',
         title: '회원수',
         count: counts?.user,
      },
      {
         id: 'daily_visitors',
         title: '일일 방문',
         count: counts?.visit,
      },
   ]
   return (
      <div className="grid grid-cols-3 gap-3 m-2 text-sm">
         {stats.map(({ id, title, count }) => (
            <StatCard key={id} title={title} count={count} />
         ))}
      </div>
   )
}
