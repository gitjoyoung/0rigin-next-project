'use client'

import type { DailyStats } from '@/entities/stats'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import type { Tables } from '@/shared/types'
import dayjs from 'dayjs'
import { useState } from 'react'
import {
   Bar,
   BarChart,
   CartesianGrid,
   ResponsiveContainer,
   Tooltip,
   XAxis,
   YAxis,
} from 'recharts'

interface StatsChartProps {
   chartStats: DailyStats[]
}

const chartConfig = {
   user_count: {
      label: '사용자',
      color: '#3b82f6',
   },
   post_count: {
      label: '게시글',
      color: '#10b981',
   },
   comment_count: {
      label: '댓글',
      color: '#f59e0b',
   },
   visitor_count: {
      label: '방문자',
      color: '#8b5cf6',
   },
} as const

type ChartKey = keyof typeof chartConfig

export default function StatsChart({
   chartStats,
}: {
   chartStats: Tables<'daily_stats'>[]
}) {
   const [activeChart, setActiveChart] = useState<ChartKey>('user_count')

   console.log('chartStats', chartStats)
   const getTotal = (key: ChartKey) =>
      chartStats.reduce((sum, stat) => sum + (stat[key] || 0), 0)

   return (
      <Card>
         <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
               <CardTitle>성장 통계</CardTitle>
               <CardDescription>
                  최근 {chartStats.length}일간의 성장 추이를 보여줍니다
               </CardDescription>
            </div>
            <div className="flex flex-1">
               {Object.keys(chartConfig).map((key) => {
                  const chartKey = key as ChartKey
                  return (
                     <button
                        key={key}
                        data-active={activeChart === key}
                        className="relative z-30 flex flex-1 flex-col justify-start gap-3 border-t px-4 py-6 data-[active=true]:bg-muted/50  sm:border-t-0 sm:px-6 sm:py-8 min-h-[100px] sm:min-h-[120px] sm:text-sm text-center border-l"
                        onClick={() => setActiveChart(chartKey)}
                     >
                        <p className="text-xs px-1 text-muted-foreground">
                           {chartConfig[chartKey].label}
                        </p>
                        <span className="text-lg font-bold leading-none sm:text-xl lg:text-2xl">
                           {getTotal(chartKey).toLocaleString()}
                        </span>
                     </button>
                  )
               })}
            </div>
         </CardHeader>
         <CardContent className="p-2 sm:p-6">
            <div className="h-[200px] sm:h-[300px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                     data={chartStats}
                     margin={{ top: 0, right: 0, left: -10, bottom: 0 }}
                  >
                     <CartesianGrid strokeDasharray="3 3" vertical={false} />
                     <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tick={{ fontSize: 12 }}
                        tickFormatter={(value) => dayjs(value).format('MM/DD')}
                     />
                     <YAxis
                        domain={[0, 'dataMax']} // 최소 0, 최대값에 딱 맞춤
                        tickLine={false}
                        axisLine={false}
                        width={60}
                        tick={{ fontSize: 10 }}
                        tickFormatter={(value) => value.toLocaleString()}
                     />
                     <Tooltip
                        contentStyle={{
                           backgroundColor: 'hsl(var(--background))',
                           border: '1px solid hsl(var(--border))',
                           borderRadius: '0.5rem',
                           fontSize: '14px',
                        }}
                        labelFormatter={(value) =>
                           dayjs(value).format('YYYY년 MM월 DD일')
                        }
                        formatter={(value: number) => [
                           value.toLocaleString(),
                           chartConfig[activeChart].label,
                        ]}
                     />
                     <Bar
                        dataKey={activeChart}
                        fill={chartConfig[activeChart].color}
                        radius={[2, 2, 0, 0]}
                     />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </CardContent>
      </Card>
   )
}
