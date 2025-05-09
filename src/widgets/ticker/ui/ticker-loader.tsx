import { motion } from 'framer-motion'

export default function TickerLoader() {
   return (
      <motion.div
         aria-label="티커 로더"
         className="absolute top-0 left-0 h-full  w-full"
         initial={{ transform: 'translateX(-100%)' }}
         animate={{ transform: 'translateX(0%)' }}
         transition={{
            duration: 2,
            ease: 'easeInOut',
            repeat: Infinity,
         }}
      />
   )
}
