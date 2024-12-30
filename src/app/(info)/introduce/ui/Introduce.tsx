'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import CommunityStats from './StatList'
import { TickerCounts } from '@/types/common/tickerTypes'
import { motion } from 'framer-motion'
import INTRODUCE_TEXT from '../model/constants'

interface Props {
   counts: TickerCounts
}

export default function Introduce({ counts }: Props) {
   const [activeSection, setActiveSection] = useState('story')

   const sectionsRef = {
      story: useRef(null),
      welcome: useRef(null),
      numbers: useRef(null),
   }

   const scrollToSection = (ref) => {
      ref.current?.scrollIntoView({
         behavior: 'smooth',
         block: 'start',
      })
   }

   useEffect(() => {
      const handleScroll = () => {
         // Find which section is most visible
         Object.entries(sectionsRef).forEach(([key, ref]) => {
            if (ref.current) {
               const rect = ref.current.getBoundingClientRect()
               if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                  setActiveSection(key)
               }
            }
         })
      }

      window.addEventListener('scroll', handleScroll)
      return () => window.removeEventListener('scroll', handleScroll)
   }, [])

   const fadeInUpVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
   }

   return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-400 to-sky-400 text-white overflow-hidden">
         <div className="max-w-6xl mx-auto px-4">
            {/* Story Section */}
            <motion.section
               ref={sectionsRef.story}
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

            {/* Welcome Section */}
            <motion.section
               ref={sectionsRef.welcome}
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

            {/* Numbers Section */}
            <motion.section
               ref={sectionsRef.numbers}
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

         {/* Navigation */}
         <nav className="fixed bottom-8 right-8 z-50">
            <div className="flex flex-col gap-1">
               {Object.entries(sectionsRef).map(([key, ref]) => (
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
                     onClick={() => scrollToSection(ref)}
                  >
                     {key.charAt(0).toUpperCase() + key.slice(1)}
                  </motion.button>
               ))}
            </div>
         </nav>
      </div>
   )
}
