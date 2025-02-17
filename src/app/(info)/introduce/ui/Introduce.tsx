'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import CommunityStats from './StatList'
import INTRODUCE_TEXT from '../model/constants'
import { TickerCounts } from '@/types/common/tickerTypes'

interface Props {
   counts: TickerCounts
}

export default function Introduce({ counts }: Props) {
   // 어떤 섹션이 활성화(현재 화면에 보임)인지 상태로 관리
   const [activeSection, setActiveSection] = useState<
      'story' | 'welcome' | 'numbers'
   >('story')

   // 각 섹션을 담을 레퍼런스들 (초기엔 모두 null)
   const sectionsRef = useRef<{
      story: HTMLElement | null
      welcome: HTMLElement | null
      numbers: HTMLElement | null
   }>({
      story: null,
      welcome: null,
      numbers: null,
   })

   // framer-motion용 기본 애니메이션 설정
   const fadeInUpVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
   }
   useEffect(() => {
      const observerOptions = {
         root: null,
         rootMargin: '0px',
         threshold: 0.5,
      }
      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry) => {
            if (entry.isIntersecting) {
               // 뷰포트에 들어온 섹션의 id를 가져와 활성 섹션으로 설정
               setActiveSection(
                  entry.target.id as 'story' | 'welcome' | 'numbers',
               )
            }
         })
      }, observerOptions)

      Object.entries(sectionsRef.current).forEach(([key, element]) => {
         if (element) {
            // 각 섹션 DOM에 id 부여 (ex: 'story', 'welcome', 'numbers')
            element.id = key
            observer.observe(element)
         }
      })

      // 언마운트 시 Intersection Observer 해제
      return () => {
         Object.values(sectionsRef.current).forEach((element) => {
            if (element) observer.unobserve(element)
         })
      }
   }, [])

   const scrollToSection = (sectionKey: 'story' | 'welcome' | 'numbers') => {
      const element = sectionsRef.current[sectionKey]
      if (element) {
         element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-sky-400 text-white overflow-hidden">
         <div className="max-w-6xl mx-auto px-4">
            <motion.section
               ref={(el) => {
                  sectionsRef.current.story = el
               }}
               className="min-h-screen flex items-center justify-center py-20"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUpVariants}
               transition={{ duration: 0.6 }}
            >
               <div className="flex flex-col md:flex-row items-center gap-8 backdrop-blur-sm bg-white/10 p-8 rounded-2xl">
                  <motion.div
                     className="relative"
                     whileHover={{ scale: 1.05 }}
                     transition={{ type: 'spring', stiffness: 300 }}
                  >
                     <Image
                        src="/mascot/winksaurus.png"
                        width={300}
                        height={300}
                        alt="윙크사우로스"
                        className="rounded-xl shadow-xl"
                        style={{ objectFit: 'contain' }}
                     />
                  </motion.div>
                  <div className="flex-1 space-y-4">
                     <h2 className="text-3xl font-bold">
                        {INTRODUCE_TEXT.story.title}
                     </h2>
                     <p className="text-lg leading-relaxed">
                        {INTRODUCE_TEXT.story.body}
                     </p>
                  </div>
               </div>
            </motion.section>

            {/* ─────────────────────────────────────────────────────
             Welcome Section
        ───────────────────────────────────────────────────── */}
            <motion.section
               ref={(el) => {
                  sectionsRef.current.welcome = el
               }}
               className="min-h-screen flex items-center justify-center py-20"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUpVariants}
               transition={{ duration: 0.6 }}
            >
               <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl max-w-2xl">
                  <h2 className="text-3xl font-bold mb-6">
                     {INTRODUCE_TEXT.welcome.title}
                  </h2>
                  <p className="text-lg leading-relaxed">
                     {INTRODUCE_TEXT.welcome.body}
                  </p>
               </div>
            </motion.section>

            {/* ─────────────────────────────────────────────────────
             Numbers Section
        ───────────────────────────────────────────────────── */}
            <motion.section
               ref={(el) => {
                  sectionsRef.current.numbers = el
               }}
               className="min-h-screen flex items-center justify-center py-20"
               initial="hidden"
               whileInView="visible"
               viewport={{ once: true }}
               variants={fadeInUpVariants}
               transition={{ duration: 0.6 }}
            >
               <div className="backdrop-blur-sm bg-white/10 p-8 rounded-2xl max-w-2xl w-full">
                  <h2 className="text-3xl font-bold mb-6">
                     {INTRODUCE_TEXT.numbers.title}
                  </h2>
                  <p className="text-lg mb-4">{INTRODUCE_TEXT.numbers.body}</p>
                  <p className="text-sm mb-6">마지막 업데이트:</p>
                  <CommunityStats counts={counts} />
               </div>
            </motion.section>
         </div>

         {/* ─────────────────────────────────────────────────────
           Navigation (오른쪽 하단 버튼)
      ───────────────────────────────────────────────────── */}
         <nav className="fixed bottom-8 right-8 z-50">
            <div className="flex flex-col gap-1">
               {(['story', 'welcome', 'numbers'] as const).map((key) => (
                  <motion.button
                     key={key}
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.95 }}
                     className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-colors duration-200
                ${
                   activeSection === key
                      ? 'bg-white text-blue-600'
                      : 'bg-blue-600 text-white hover:bg-blue-500'
                }
              `}
                     onClick={() => scrollToSection(key)}
                  >
                     {key.charAt(0).toUpperCase() + key.slice(1)}
                  </motion.button>
               ))}
            </div>
         </nav>
      </div>
   )
}
