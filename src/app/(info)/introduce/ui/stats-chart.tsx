'use client'

import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import dayjs from 'dayjs'
import * as React from 'react'
import {
   Bar,
   BarChart,
   CartesianGrid,
   ResponsiveContainer,
   Tooltip,
   XAxis,
} from 'recharts'

const chartData = [
   { date: '2024-04-01', users: 372, posts: 150, comments: 45 },
   { date: '2024-04-02', users: 277, posts: 180, comments: 55 },
   { date: '2024-04-03', users: 287, posts: 120, comments: 35 },
   { date: '2024-04-04', users: 502, posts: 260, comments: 78 },
   { date: '2024-04-05', users: 663, posts: 290, comments: 87 },
   { date: '2024-04-06', users: 641, posts: 340, comments: 102 },
   { date: '2024-04-07', users: 425, posts: 180, comments: 54 },
   { date: '2024-04-08', users: 729, posts: 320, comments: 96 },
   { date: '2024-04-09', users: 169, posts: 110, comments: 33 },
   { date: '2024-04-10', users: 451, posts: 190, comments: 57 },
   { date: '2024-04-11', users: 677, posts: 350, comments: 105 },
   { date: '2024-04-12', users: 502, posts: 210, comments: 63 },
   { date: '2024-04-13', users: 722, posts: 380, comments: 114 },
   { date: '2024-04-14', users: 357, posts: 220, comments: 66 },
   { date: '2024-04-15', users: 290, posts: 170, comments: 51 },
   { date: '2024-04-16', users: 328, posts: 190, comments: 57 },
   { date: '2024-04-17', users: 806, posts: 360, comments: 108 },
   { date: '2024-04-18', users: 774, posts: 410, comments: 123 },
   { date: '2024-04-19', users: 423, posts: 180, comments: 54 },
   { date: '2024-04-20', users: 239, posts: 150, comments: 45 },
   { date: '2024-04-21', users: 337, posts: 200, comments: 60 },
   { date: '2024-04-22', users: 394, posts: 170, comments: 51 },
   { date: '2024-04-23', users: 368, posts: 230, comments: 69 },
   { date: '2024-04-24', users: 677, posts: 290, comments: 87 },
   { date: '2024-04-25', users: 465, posts: 250, comments: 75 },
   { date: '2024-04-26', users: 205, posts: 130, comments: 39 },
   { date: '2024-04-27', users: 803, posts: 420, comments: 126 },
   { date: '2024-04-28', users: 302, posts: 180, comments: 54 },
   { date: '2024-04-29', users: 555, posts: 240, comments: 72 },
   { date: '2024-04-30', users: 834, posts: 380, comments: 114 },
   { date: '2024-05-01', users: 385, posts: 220, comments: 66 },
   { date: '2024-05-02', users: 603, posts: 310, comments: 93 },
   { date: '2024-05-03', users: 437, posts: 190, comments: 57 },
   { date: '2024-05-04', users: 805, posts: 420, comments: 126 },
   { date: '2024-05-05', users: 871, posts: 390, comments: 117 },
   { date: '2024-05-06', users: 1018, posts: 520, comments: 156 },
   { date: '2024-05-07', users: 688, posts: 300, comments: 90 },
   { date: '2024-05-08', users: 359, posts: 210, comments: 63 },
   { date: '2024-05-09', users: 407, posts: 180, comments: 54 },
   { date: '2024-05-10', users: 623, posts: 330, comments: 99 },
   { date: '2024-05-11', users: 605, posts: 270, comments: 81 },
   { date: '2024-05-12', users: 437, posts: 240, comments: 72 },
   { date: '2024-05-13', users: 357, posts: 160, comments: 48 },
   { date: '2024-05-14', users: 938, posts: 490, comments: 147 },
   { date: '2024-05-15', users: 853, posts: 380, comments: 114 },
   { date: '2024-05-16', users: 738, posts: 400, comments: 120 },
   { date: '2024-05-17', users: 919, posts: 420, comments: 126 },
   { date: '2024-05-18', users: 665, posts: 350, comments: 105 },
   { date: '2024-05-19', users: 415, posts: 180, comments: 54 },
   { date: '2024-05-20', users: 407, posts: 230, comments: 69 },
   { date: '2024-05-21', users: 222, posts: 140, comments: 42 },
   { date: '2024-05-22', users: 201, posts: 120, comments: 36 },
   { date: '2024-05-23', users: 542, posts: 290, comments: 87 },
   { date: '2024-05-24', users: 514, posts: 220, comments: 66 },
   { date: '2024-05-25', users: 451, posts: 250, comments: 75 },
   { date: '2024-05-26', users: 383, posts: 170, comments: 51 },
   { date: '2024-05-27', users: 880, posts: 460, comments: 138 },
   { date: '2024-05-28', users: 423, posts: 190, comments: 57 },
   { date: '2024-05-29', users: 208, posts: 130, comments: 39 },
   { date: '2024-05-30', users: 620, posts: 280, comments: 84 },
   { date: '2024-05-31', users: 408, posts: 230, comments: 69 },
   { date: '2024-06-01', users: 378, posts: 200, comments: 60 },
   { date: '2024-06-02', users: 880, posts: 410, comments: 123 },
   { date: '2024-06-03', users: 263, posts: 160, comments: 48 },
   { date: '2024-06-04', users: 819, posts: 380, comments: 114 },
   { date: '2024-06-05', users: 228, posts: 140, comments: 42 },
   { date: '2024-06-06', users: 544, posts: 250, comments: 75 },
   { date: '2024-06-07', users: 693, posts: 370, comments: 111 },
   { date: '2024-06-08', users: 705, posts: 320, comments: 96 },
   { date: '2024-06-09', users: 918, posts: 480, comments: 144 },
   { date: '2024-06-10', users: 355, posts: 200, comments: 60 },
   { date: '2024-06-11', users: 242, posts: 150, comments: 45 },
   { date: '2024-06-12', users: 912, posts: 420, comments: 126 },
   { date: '2024-06-13', users: 211, posts: 130, comments: 39 },
   { date: '2024-06-14', users: 806, posts: 380, comments: 114 },
   { date: '2024-06-15', users: 657, posts: 350, comments: 105 },
   { date: '2024-06-16', users: 681, posts: 310, comments: 93 },
   { date: '2024-06-17', users: 995, posts: 520, comments: 156 },
   { date: '2024-06-18', users: 277, posts: 170, comments: 51 },
   { date: '2024-06-19', users: 631, posts: 290, comments: 87 },
   { date: '2024-06-20', users: 858, posts: 450, comments: 135 },
   { date: '2024-06-21', users: 379, posts: 210, comments: 63 },
   { date: '2024-06-22', users: 587, posts: 270, comments: 81 },
   { date: '2024-06-23', users: 1010, posts: 530, comments: 159 },
   { date: '2024-06-24', users: 312, posts: 180, comments: 54 },
   { date: '2024-06-25', users: 331, posts: 190, comments: 57 },
   { date: '2024-06-26', users: 814, posts: 380, comments: 114 },
   { date: '2024-06-27', users: 938, posts: 490, comments: 147 },
   { date: '2024-06-28', users: 349, posts: 200, comments: 60 },
   { date: '2024-06-29', users: 263, posts: 160, comments: 48 },
   { date: '2024-06-30', users: 846, posts: 400, comments: 120 },
]
const chartConfig = {
   users: {
      label: '사용자 수',
      color: '#3b82f6',
   },
   posts: {
      label: '게시글 수',
      color: '#10b981',
   },
   comments: {
      label: '댓글 수',
      color: '#f59e0b',
   },
}

export default function StatsChart() {
   const [activeChart, setActiveChart] = React.useState<
      'users' | 'posts' | 'comments'
   >('users')

   const total = React.useMemo(
      () => ({
         users: chartData.reduce((acc, curr) => acc + curr.users, 0),
         posts: chartData.reduce((acc, curr) => acc + curr.posts, 0),
         comments: chartData.reduce((acc, curr) => acc + curr.comments, 0),
      }),
      [],
   )

   return (
      <Card className="my-20">
         <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
            <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
               <CardTitle className="text-3xl flex items-center gap-2">
                  숫자로 보는
                  <h3 className="text-xl sm:text-2xl font-dos">0RIGIN</h3>
               </CardTitle>
               <CardTitle>성장 통계</CardTitle>
               <CardDescription>
                  최근 6개월간의 성장 추이를 보여줍니다
               </CardDescription>
            </div>
            <div className="flex">
               {(['users', 'posts', 'comments'] as const).map((key) => (
                  <button
                     key={key}
                     data-active={activeChart === key}
                     className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                     onClick={() => setActiveChart(key)}
                  >
                     <span className="text-xs text-muted-foreground">
                        {chartConfig[key].label}
                     </span>
                     <span className="text-lg font-bold leading-none sm:text-3xl">
                        {total[key].toLocaleString()}
                     </span>
                  </button>
               ))}
            </div>
         </CardHeader>
         <CardContent className="px-2 sm:p-6">
            <div className="h-[250px] w-full">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                     data={chartData}
                     margin={{
                        left: 12,
                        right: 12,
                     }}
                  >
                     <CartesianGrid vertical={false} />
                     <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        minTickGap={32}
                        tickFormatter={(value) => {
                           return dayjs(value).format('YYYY-MM-DD')
                        }}
                     />
                     <Tooltip
                        contentStyle={{
                           backgroundColor: 'hsl(var(--background))',
                           border: '1px solid hsl(var(--border))',
                           borderRadius: '0.5rem',
                        }}
                        labelFormatter={(value) => {
                           return dayjs(value).format('YYYY-MM-DD')
                        }}
                        formatter={(value) => [
                           value,
                           chartConfig[activeChart].label,
                        ]}
                     />
                     <Bar
                        dataKey={activeChart}
                        fill={chartConfig[activeChart].color}
                     />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </CardContent>
      </Card>
   )
}
