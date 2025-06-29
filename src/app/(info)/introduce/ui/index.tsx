'use client'

import type { DailyStats } from '@/entities/stats'
import { Badge } from '@/shared/shadcn/ui/badge'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Separator } from '@/shared/shadcn/ui/separator'
import Image from 'next/image'
import StatsChart from './stats-chart'

const INTRODUCE_DATA = {
   story: {
      title: '0RIGIN 커뮤니티',
      subtitle: '무, 공, 허무 그리고 아포리아',
      description:
         '0RIGIN은 소크라테스의 겸손한 지혜, ‘내가 모른다는 것을 아는 것’에서 출발합니다. 다양한 생각을 존중하며, 경계를 허무는 대화 속에서 함께 성장합니다. 우리는 자유롭게 말하고, 귀 기울이며, 서로를 연결합니다.',
      image: '/images/mascot/logo.webp',
   },
   features: [
      { title: '철학', description: '깊이 있는 사고와 토론', icon: '🤔' },
      { title: '기술', description: '최신 기술 트렌드와 개발', icon: '💻' },
      { title: '과학', description: '과학적 탐구와 발견', icon: '🔬' },
      { title: '수학', description: '논리적 사고와 추론', icon: '📐' },
   ],
   stats: {
      title: '통계',
      description: '숫자로 보는 0RIGIN',
   },
}

export default function Introduce({ stats }: { stats: Partial<DailyStats> }) {
   return (
      <div className="min-h-screen bg-background">
         <div className="container mx-auto px-4 py-16 max-w-4xl">
            {/* 헤더 섹션 */}
            <div className="text-center mb-16">
               <div className="flex justify-center mb-6">
                  <Image
                     src={INTRODUCE_DATA.story.image}
                     alt="0RIGIN 로고"
                     width={200}
                     height={200}
                     className="rounded-lg"
                     style={{ objectFit: 'cover' }}
                  />
               </div>
               <h1 className="text-4xl font-bold mb-4">
                  {INTRODUCE_DATA.story.title}
               </h1>
               <p className="text-xl text-muted-foreground mb-6 ">
                  {INTRODUCE_DATA.story.subtitle}
               </p>
               <p className="text-lg leading-relaxed break-keep text-muted-foreground max-w-2xl mx-auto">
                  {INTRODUCE_DATA.story.description}
               </p>
            </div>

            <Separator className="my-16" />

            {/* 특징 섹션 */}
            <div className="mb-16">
               <h2 className="text-2xl font-semibold text-center mb-8">
                  주요 카테고리
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {INTRODUCE_DATA.features.map((feature, index) => (
                     <Card
                        key={index}
                        className="text-center hover:shadow-md transition-shadow"
                     >
                        <CardHeader>
                           <div className="text-3xl mb-2">{feature.icon}</div>
                           <CardTitle className="text-lg">
                              {feature.title}
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <CardDescription>
                              {feature.description}
                           </CardDescription>
                        </CardContent>
                     </Card>
                  ))}
               </div>
            </div>

            <Separator className="my-16" />

            {/* 통계 섹션 */}
            <div className="">
               <div className="text-center ">
                  <h2 className="text-2xl font-semibold ">
                     {INTRODUCE_DATA.stats.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                     {INTRODUCE_DATA.stats.description}
                  </p>
               </div>
               <StatsChart />
            </div>

            {/* CTA 섹션 */}
            <Card className="text-center">
               <CardHeader>
                  <CardTitle className="text-xl">지금 시작해보세요</CardTitle>
                  <CardDescription>
                     0RIGIN 커뮤니티에 참여하여 다양한 생각을 나누고 함께
                     성장해보세요
                  </CardDescription>
               </CardHeader>
               <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Badge variant="secondary" className="text-sm px-4 py-2">
                        자유로운 토론
                     </Badge>
                     <Badge variant="secondary" className="text-sm px-4 py-2">
                        지식 공유
                     </Badge>
                     <Badge variant="secondary" className="text-sm px-4 py-2">
                        함께 성장
                     </Badge>
                  </div>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
