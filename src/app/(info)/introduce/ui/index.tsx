'use client'

import type { DailyStats } from '@/entities/stats'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { Separator } from '@/shared/shadcn/ui/separator'
import Image from 'next/image'
import Link from 'next/link'
import StatsChart from './stats-chart'

const INTRODUCE_DATA = {
   story: {
      title: '0RIGIN(제로리진) 커뮤니티',
      description:
         '0RIGIN(제로리진)은 일상의 고민과 사회적 이슈를 자유로운 질문과 건강한 토론을 통해 생각을 공유합니다. 자유롭게 말하고, 귀 기울이며, 서로를 연결합니다.',
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

interface IntroduceProps {
   chartStats: DailyStats[]
}

export default function Introduce({ chartStats }: IntroduceProps) {
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
               <div className="flex flex-col gap-4">
                  <h1 className="text-lg sm:text-2xl font-bold ">
                     {INTRODUCE_DATA.story.title}
                  </h1>
                  <p className="text-xs sm:text-base leading-relaxed break-keep text-muted-foreground">
                     {INTRODUCE_DATA.story.description}
                  </p>
               </div>
            </div>

            <Separator className="my-16" />

            {/* 특징 섹션 */}
            <div className="mb-16">
               <h2 className="text-lg sm:text-2xl font-semibold text-center mb-4">
                  주요 카테고리
               </h2>
               {/* 데스크톱 그리드 */}
               <div className="hidden lg:grid grid-cols-4 gap-6">
                  {INTRODUCE_DATA.features.map((feature, index) => (
                     <Card
                        key={index}
                        className="text-center hover:shadow-md transition-shadow"
                     >
                        <CardHeader>
                           <div className="text-3xl mb-2">{feature.icon}</div>
                           <CardTitle className="text-sm sm:text-lg">
                              {feature.title}
                           </CardTitle>
                        </CardHeader>
                        <CardContent>
                           <CardDescription className="text-xs sm:text-sm">
                              {feature.description}
                           </CardDescription>
                        </CardContent>
                     </Card>
                  ))}
               </div>

               {/* 모바일/태블릿 슬라이더 */}
               <div className="lg:hidden">
                  <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory">
                     {INTRODUCE_DATA.features.map((feature, index) => (
                        <Card
                           key={index}
                           className="flex-none w-64 text-center hover:shadow-md transition-shadow snap-start"
                        >
                           <CardHeader>
                              <div className="text-2xl sm:text-3xl mb-2">
                                 {feature.icon}
                              </div>
                              <CardTitle className="text-sm sm:text-lg">
                                 {feature.title}
                              </CardTitle>
                           </CardHeader>
                           <CardContent>
                              <CardDescription className="text-xs sm:text-sm">
                                 {feature.description}
                              </CardDescription>
                           </CardContent>
                        </Card>
                     ))}
                  </div>
               </div>
            </div>

            <Separator className="my-16" />

            {/* 통계 섹션 */}
            <div className="">
               <div className="text-center mb-4">
                  <h2 className="text-lg sm:text-2xl font-semibold">
                     {INTRODUCE_DATA.stats.title}
                  </h2>
               </div>
               <StatsChart chartStats={chartStats} />
            </div>

            <Separator className="my-16" />

            {/* CTA 섹션 */}
            <div className="text-center">
               <h2 className="text-lg sm:text-2xl font-semibold mb-4">
                  지금 시작해보세요
               </h2>
               <p className="text-xs sm:text-base text-muted-foreground mb-8 max-w-2xl mx-auto">
                  0RIGIN 커뮤니티에 참여하여 다양한 생각을 나누고 함께
                  성장해보세요
               </p>
               <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild variant="outline" size="lg">
                     <Link href="/board/latest">자유 토론 게시판</Link>
                  </Button>
                  <Button asChild size="lg">
                     <Link href="/quiz">퀴즈 풀기</Link>
                  </Button>
               </div>
            </div>
         </div>
      </div>
   )
}
