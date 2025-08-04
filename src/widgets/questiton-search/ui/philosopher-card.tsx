'use client'

import { Badge } from '@/shared/shadcn/ui/badge'
import { Button } from '@/shared/shadcn/ui/button'
import {
   Card,
   CardContent,
   CardDescription,
   CardHeader,
   CardTitle,
} from '@/shared/shadcn/ui/card'
import { cn } from '@/shared/utils/cn'
import { BookOpen, Quote } from 'lucide-react'
import type { MatchingResult } from '../types'

interface PhilosopherCardProps {
   result: MatchingResult
   isSelected?: boolean
   onClick?: () => void
   onWriteClick?: () => void
}

export default function PhilosopherCard({
   result,
   isSelected = false,
   onClick,
   onWriteClick,
}: PhilosopherCardProps) {
   const { philosopher, relevanceScore, suggestedAnswer } = result

   return (
      <Card
         className={cn(
            'cursor-pointer transition-all duration-200 hover:shadow-md',
            isSelected && 'ring-2 ring-primary shadow-lg',
         )}
         onClick={onClick}
      >
         <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
               <div className="flex-1">
                  <CardTitle className="text-lg font-bold">
                     {philosopher.name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                     {philosopher.era} · {philosopher.nationality}
                  </CardDescription>
               </div>
               <Badge variant="secondary" className="ml-2">
                  {relevanceScore}점
               </Badge>
            </div>
         </CardHeader>

         <CardContent className="space-y-3">
            <div>
               <div className="flex items-center gap-2 mb-2">
                  <Quote className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">답변</p>
               </div>
               <p className="text-sm leading-relaxed italic text-muted-foreground">
                  &ldquo;{suggestedAnswer}&rdquo;
               </p>
            </div>

            {onWriteClick && (
               <Button
                  onClick={(e) => {
                     e.stopPropagation()
                     onWriteClick()
                  }}
                  size="sm"
                  className="w-full"
               >
                  <BookOpen className="h-4 w-4 mr-2" />
                  글쓰기
               </Button>
            )}
         </CardContent>
      </Card>
   )
}
