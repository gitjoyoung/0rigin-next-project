'use client'
import { formatNumberCompact } from '@/shared/utils/format-number'
import { motion } from 'framer-motion'

type Props = {
   label: string
   value: number
   ariaLabel: string
}

export default function TickerItem({ label, value, ariaLabel }: Props) {
   return (
      <div className="flex items-center  text-[10px]">
         <strong className="px-1">{label}</strong>
         <motion.span
            aria-label={ariaLabel}
            className="min-w-3 text-left px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
         >
            <strong>{formatNumberCompact(value || 0)}</strong>
         </motion.span>
      </div>
   )
}
