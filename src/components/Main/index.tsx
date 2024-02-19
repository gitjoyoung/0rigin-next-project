'use client'

import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import Weather from './weather'

export default function Main() {
   const [currentTime, setCurrentTime] = useState(dayjs().toString())

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentTime(dayjs().toString())
      }, 1000)

      return () => {
         clearInterval(interval)
      }
   }, [])
   return (
      <section className="w-full">
         <h1 className="text-center font-bold">{currentTime}</h1>
         <Weather />
      </section>
   )
}
