import { formatSmartDate } from '@/shared/utils/dayjs-config'
import { useEffect, useState } from 'react'

export default function ClientDayHydration({ date }: { date: string }) {
   const [mounted, setMounted] = useState(false)
   useEffect(() => setMounted(true), [])
   if (!mounted) return <span>{date.slice(0, 10)}</span>
   return <span>{formatSmartDate(date)}</span>
}
