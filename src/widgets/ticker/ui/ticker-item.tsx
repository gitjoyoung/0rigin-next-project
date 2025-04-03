'use client'
import { formatNumberToString } from '@/shared/utils/format-number'
import { motion } from 'framer-motion'

type Props = {
   label: string
   value: number
}

export default function TickerItem({ label, value }: Props) {
   return (
      <li className="flex items-center text-[11px]">
         <strong className="px-1">{label}</strong>
         <motion.span
            className="min-w-[32px] text-left px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
         >
            {formatNumberToString(value || 0)}
         </motion.span>
      </li>
   )
}
