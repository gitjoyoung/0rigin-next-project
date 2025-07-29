'use client'

import { Badge } from '@/shared/shadcn/ui/badge'
import {
   Card,
   CardContent,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { ExternalLink, FileText, Quote } from 'lucide-react'
import Link from 'next/link'
import type { MatchingResult } from '../types'

interface PhilosopherCarouselProps {
   results: MatchingResult[]
}

export default function PhilosopherCarousel({
   results,
}: PhilosopherCarouselProps) {
   return (
      <div className="w-full">
         <div className="hidden lg:grid lg:grid-cols-3 gap-4 w-full">
            {results.map((result) => (
               <Card
                  key={result.philosopher.id}
                  className="min-h-[400px] w-full relative"
               >
                  <CardHeader className="pb-3">
                     <div className="flex items-start justify-between">
                        <div className="flex-1">
                           <CardTitle className="text-lg font-bold mb-1">
                              {result.philosopher.name}
                           </CardTitle>
                           <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                              <span>{result.philosopher.era}</span>
                              <span>•</span>
                              <span>{result.philosopher.nationality}</span>
                           </div>
                           <p className="text-xs text-muted-foreground">
                              {result.philosopher.mainPhilosophy}
                           </p>
                        </div>
                        <Badge variant="secondary" className="ml-2 text-xs">
                           {result.relevanceScore}점
                        </Badge>
                     </div>
                  </CardHeader>

                  <CardContent className="pb-20">
                     {/* 주요 사유 */}
                     <div className="space-y-2">
                        {result.philosopher.answers
                           .slice(0, 2)
                           .map((answer, index) => (
                              <div
                                 key={index}
                                 className="p-3 bg-muted/50 rounded-lg"
                              >
                                 <p className="text-xs leading-relaxed italic">
                                    &ldquo;{answer}&rdquo;
                                 </p>
                              </div>
                           ))}
                     </div>

                     {/* 철학가 설명 */}
                     <div className="mt-4">
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                           {result.philosopher.description}
                        </p>
                     </div>
                  </CardContent>

                  {/* 관련 게시글 - 절대 위치로 하단 고정 */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-background rounded-b-2xl">
                     <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-3 w-3 text-primary" />
                        <h4 className="font-semibold text-xs">관련 게시글</h4>
                     </div>
                     {result.relatedPosts && result.relatedPosts.length > 0 ? (
                        <div className="space-y-1">
                           {result.relatedPosts.slice(0, 2).map((post) => (
                              <Link
                                 key={post.id}
                                 href={post.url}
                                 className="block p-2 bg-muted/30 rounded text-xs hover:bg-muted/50 transition-colors"
                              >
                                 <div className="flex items-center justify-between">
                                    <span className="truncate">
                                       {post.title}
                                    </span>
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                 </div>
                              </Link>
                           ))}
                        </div>
                     ) : (
                        <p className="text-xs text-muted-foreground">
                           관련 게시글이 없습니다.
                        </p>
                     )}
                  </div>
               </Card>
            ))}
         </div>

         {/* 모바일: 가로 스크롤 캐러셀 */}
         <div className="lg:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-4 min-w-max">
               {results.map((result) => (
                  <Card
                     key={result.philosopher.id}
                     className="w-[260px] min-w-[260px] flex-shrink-0 relative"
                  >
                     <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                           <div className="flex-1">
                              <CardTitle className="text-base font-bold mb-1">
                                 {result.philosopher.name}
                              </CardTitle>
                              <div className="flex items-center gap-3 text-xs text-muted-foreground mb-1">
                                 <span>{result.philosopher.era}</span>
                                 <span>•</span>
                                 <span>{result.philosopher.nationality}</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                 {result.philosopher.mainPhilosophy}
                              </p>
                           </div>
                           <Badge variant="secondary" className="ml-2 text-xs">
                              {result.relevanceScore}점
                           </Badge>
                        </div>
                     </CardHeader>

                     <CardContent className="pb-16">
                        {/* 주요 사유 */}
                        <div className="mb-3">
                           <div className="flex items-center gap-2 mb-2">
                              <Quote className="h-3 w-3 text-primary" />
                              <h4 className="font-semibold text-xs">
                                 이러한 철학가가 고민을 하였습니다
                              </h4>
                           </div>
                           <div className="space-y-1">
                              {result.philosopher.answers
                                 .slice(0, 1)
                                 .map((answer, index) => (
                                    <div
                                       key={index}
                                       className="p-2 bg-muted/50 rounded-lg"
                                    >
                                       <p className="text-xs leading-relaxed italic">
                                          &ldquo;{answer}&rdquo;
                                       </p>
                                    </div>
                                 ))}
                           </div>
                        </div>

                        {/* 철학가 설명 */}
                        <div>
                           <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                              {result.philosopher.description}
                           </p>
                        </div>
                     </CardContent>

                     {/* 관련 게시글 - 절대 위치로 하단 고정 */}
                     <div className="absolute bottom-0 left-0 right-0 p-3 border-t bg-background rounded-b-2xl">
                        <div className="flex items-center gap-2 mb-1">
                           <FileText className="h-3 w-3 text-primary" />
                           <h4 className="font-semibold text-xs">
                              관련 게시글
                           </h4>
                        </div>
                        {result.relatedPosts &&
                        result.relatedPosts.length > 0 ? (
                           <div className="space-y-1">
                              {result.relatedPosts.slice(0, 1).map((post) => (
                                 <Link
                                    key={post.id}
                                    href={post.url}
                                    className="block p-1 bg-muted/30 rounded text-xs hover:bg-muted/50 transition-colors"
                                 >
                                    <div className="flex items-center justify-between">
                                       <span className="truncate">
                                          {post.title}
                                       </span>
                                       <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                    </div>
                                 </Link>
                              ))}
                           </div>
                        ) : (
                           <p className="text-xs text-muted-foreground">
                              관련 게시글이 없습니다.
                           </p>
                        )}
                     </div>
                  </Card>
               ))}
            </div>
         </div>

         {/* 모바일 스크롤 안내 */}
         <div className="lg:hidden text-center mt-4">
            <p className="text-xs text-muted-foreground">
               ← 좌우로 스크롤하여 더 많은 철학가를 확인하세요 →
            </p>
         </div>
      </div>
   )
}
