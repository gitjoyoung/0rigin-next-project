'use client'

import { Button } from '@/shared/shadcn/ui/button'
import { ChevronDown, ChevronUp, X } from 'lucide-react'

interface QuestionActionsProps {
   canMoveUp: boolean
   canMoveDown: boolean
   canRemove: boolean
   onMoveUp?: () => void
   onMoveDown?: () => void
   onRemove?: () => void
}

export function QuestionActions({
   canMoveUp,
   canMoveDown,
   canRemove,
   onMoveUp,
   onMoveDown,
   onRemove,
}: QuestionActionsProps) {
   return (
      <div className="flex-shrink-0 flex items-center gap-1">
         {canMoveUp && (
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={onMoveUp}
               className="text-purple-600 hover:text-purple-700 p-1"
            >
               <ChevronUp className="w-4 h-4" />
            </Button>
         )}
         {canMoveDown && (
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={onMoveDown}
               className="text-purple-600 hover:text-purple-700 p-1"
            >
               <ChevronDown className="w-4 h-4" />
            </Button>
         )}
         {canRemove && (
            <Button
               type="button"
               variant="ghost"
               size="sm"
               onClick={onRemove}
               className="text-red-600 hover:text-red-700 p-1"
            >
               <X className="w-4 h-4" />
            </Button>
         )}
      </div>
   )
}
