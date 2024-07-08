'use client'
import React from 'react'
import {
   Legend,
   PolarAngleAxis,
   PolarGrid,
   PolarRadiusAxis,
   Radar,
   RadarChart,
} from 'recharts'

interface Props {
   width?: number
   height?: number
   PorlarAngle?: boolean
   data?: any
}
export default function StockChart({ data }: Props) {
   const dataExam = [
      {
         subject: 'Math',
         A: 120,
         B: 110,
         fullMark: 150,
      },

      {
         subject: 'English',
         A: 86,
         B: 130,
         fullMark: 150,
      },
      {
         subject: 'Geography',
         A: 99,
         B: 100,
         fullMark: 150,
      },
      {
         subject: 'Physics',
         A: 85,
         B: 90,
         fullMark: 150,
      },
      {
         subject: 'History',
         A: 65,
         B: 85,
         fullMark: 150,
      },
   ]

   const width = 160
   const height = 160
   const smallerDimension = Math.min(width, height)
   const outerRadius = (smallerDimension / 2) * 0.8 // 전체 크기의 80%를 사용

   const PorlarAngle = false
   return (
      <RadarChart
         outerRadius={outerRadius}
         width={width}
         height={height}
         data={dataExam}
      >
         {PorlarAngle && <PolarAngleAxis dataKey="subject" />}

         {/* 외각선 9F9F9F */}
         <PolarGrid stroke="#E9E9E9" strokeWidth={1} outerRadius={3} />
         <Radar
            name="Lily"
            dataKey="B"
            stroke="#00ACF2"
            fill="#B2E6FA"
            fillOpacity={0.6}
         />
         <Legend />
      </RadarChart>
   )
}
