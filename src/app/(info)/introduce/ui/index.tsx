'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'
import type { IIntroduceStats } from '../model/types'
import StatsChart from './stats-chart'

const INTRODUCE_TEXT = {
   story: {
      src: '/images/introduce/logo.png',
      title: '0rigin 소개',
      body: `0rigin은 "내가 아는 것은 내가 아무것도 모른다는 것뿐이다"
       는 철학적 명제에 기반을 둔 커뮤니티입니다. `,
   },
   welcome: {
      src: '/images/introduce/logo2.png',
      title: '0rigin에 오신 것을 환영합니다',
      body: `0rigin 커뮤니티에 오신 것을 진심으로 환영합니다. 우리는 다양한 의견을 존중하고, 서로의 다양성을 인정하며, 함께 협력하여 더 나은 세상을 만들어가는 것을 목표로 합니다.`,
   },
   numbers: {
      src: '/images/introduce/logo3.png',
      title: '숫자로 보는 0rigin',
      body: '0rigin은 지속적인 성장을 추구합니다.',
   },
}

const springConfig = {
   stiffness: 100,
   damping: 30,
   restDelta: 0.001,
}

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
            className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl max-w-2xl w-full"
            style={{ y }}
         >
            <div className="relative h-64 w-full mb-6 rounded-xl overflow-hidden">
               <Image
                  src={imageSrc}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={75}
                  priority={id === 1}
                  className="object-cover"
               />
            </div>
            <h2 className="text-3xl font-bold mb-6">{title}</h2>
            <p className="text-lg leading-relaxed">{body}</p>
         </motion.div>
      </section>
   )
}

export default function Introduce({
   stats,
}: {
   stats: Partial<IIntroduceStats>
}) {
   const { scrollYProgress } = useScroll()
   const scaleX = useSpring(scrollYProgress, {
      ...springConfig,
      mass: 0.1,
      damping: 20,
   })

   return (
      <div className="min-h-screen overflow-hidden">
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
