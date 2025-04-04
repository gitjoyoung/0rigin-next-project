'use client'
import { formatNumberToString } from '@/shared/utils/formatNumberToString'
import { motion } from 'framer-motion'

interface TickerItemProps {
   label: string
   value: number
}

export default function TickerItem({ label, value }: TickerItemProps) {
   return (
      <li className="flex items-center text-[11px]">
         <span className="px-1">{label}</span>
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
