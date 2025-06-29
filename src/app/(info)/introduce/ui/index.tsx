'use client'

import type { DailyStats } from '@/entities/stats'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import StatsChart from './stats-chart'

const INTRODUCE_TEXT = {
   story: {
      src: '/images/mascot/compressed_logo.image_webp',
      title: '0RIGIN 커뮤니티 란?',
      body: `0RIGIN은 "내가 아는 것은 내가 아무것도 모른다는 것"이라는 소크라테스의 겸손한 지혜를 바탕으로 시작된 커뮤니티입니다. 우리는 다양한 관점을 존중하고, 자유로운 토론을 통해 서로의 생각을 나누며 함께 성장하는 것을 추구합니다. 각자의 경험과 지식이 모여 더 넓은 시야와 깊은 통찰을 얻을 수 있도록, 열린 마음으로 서로를 배려하고 존중하는 공간을 만들고자 합니다.`,
   },
   welcome: {
      src: '/images/mascot/compressed_logo2.image_webp',
      title: '0RIGIN에 오신 것을 환영합니다',
      body: `0RIGIN에서 당신의 생각과 경험을 자유롭게 나누어 주세요. 우리는 서로의 다양성을 인정하고, 서로 다른 관점을 통해 세상을 더 넓게 바라보는 것을 중요하게 생각합니다. 함께 토론하고, 배우고, 성장하며, 더 나은 세상을 만들어가는 과정에 동참해 주시길 바랍니다.`,
   },
   numbers: {
      src: '/images/mascot/compressed_logo3.image_webp',
      title: '숫자로 보는 0RIGIN',
      body: '0RIGIN의 현재 통계를 확인해보세요.',
   },
}

const springConfig = {
   stiffness: 100,
   damping: 30,
   restDelta: 0.001,
}

// 패럴랙스 효과를 위한 함수
function useParallax(value: any, distance: number) {
   return useTransform(value, [0, 1], [-distance, distance])
}

function Card({
   id,
   title,
   body,
   imageSrc,
}: {
   id: number
   title: string
   body: string
   imageSrc: string
}) {
   const ref = useRef(null)
   const { scrollYProgress } = useScroll({
      target: ref,
      offset: ['start end', 'end start'],
   })
   const y = useParallax(scrollYProgress, 50)

   return (
      <section
         ref={ref}
         className="min-h-screen flex items-center justify-center py-20"
      >
         <motion.div
            className="backdrop-blur-sm bg-gradient-to-br from-white/20 to-white/5 p-8 rounded-2xl max-w-2xl w-full shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.4)] hover:scale-[1.02]"
            style={{ y }}
            whileHover={{
               boxShadow: '0 0 50px rgba(59, 130, 246, 0.4)',
               transition: { duration: 0.3 },
            }}
         >
            <div className="relative h-64 w-full mb-6 rounded-xl overflow-hidden group">
               <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  priority={id === 1}
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
               {title}
            </h2>
            <p className="text-lg leading-relaxed text-gray-200">{body}</p>
         </motion.div>
      </section>
   )
}

export default function Introduce({ stats }: { stats: Partial<DailyStats> }) {
   const { scrollYProgress } = useScroll()
   const scaleX = useSpring(scrollYProgress, {
      ...springConfig,
      mass: 0.1,
      damping: 20,
   })

   return (
      <div className="min-h-screen overflow-hidden font-dos">
         <div className="max-w-6xl mx-auto px-4">
            <Card
               id={1}
               title={INTRODUCE_TEXT.story.title}
               body={INTRODUCE_TEXT.story.body}
               imageSrc={INTRODUCE_TEXT.story.src}
            />
            <Card
               id={2}
               title={INTRODUCE_TEXT.welcome.title}
               body={INTRODUCE_TEXT.welcome.body}
               imageSrc={INTRODUCE_TEXT.welcome.src}
            />
            <StatsChart />
         </div>
         <motion.div
            className="fixed bottom-0 left-0 right-0 h-1 bg-blue-500 origin-left"
            style={{ scaleX }}
         />
      </div>
   )
}
