'use client'

import dayjs from '@/shared/utils/dayjs-config'
import { useEffect, useState } from 'react'

export default function HydratedDate({ date }: { date: string }) {
   const [mounted, setMounted] = useState(false)
   useEffect(() => setMounted(true), [])
   const targetDate = dayjs.utc(date).tz('Asia/Seoul')
   if (!mounted) return <>{date.slice(0, 10)}</>
   return <>{targetDate.format('YYYY.MM.DD HH:mm:ss')}</>
}
