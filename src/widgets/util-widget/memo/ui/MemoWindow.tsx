import { Card, CardContent, CardHeader } from '@/shared/shadcn/ui/card'
import { FC, useState } from 'react'
import { Rnd } from 'react-rnd'

export const MemoWindow: FC<{
   id: number
   onClose: (id: number) => void
   onMinimize: (id: number) => void
   onMaximize: (id: number) => void
   isMaximized: boolean
   isMinimized: boolean
   parentSelector: string
   zIndex: number
   onFocus: (id: number) => void
}> = ({
   id,
   onClose,
   onMinimize,
   onMaximize,
   isMaximized,
   isMinimized,
   parentSelector,
   zIndex,
   onFocus,
}) => {
   const [memo, setMemo] = useState('')
   const [size, setSize] = useState({ width: 220, height: 120 })
   if (isMinimized) return null
   const getMaxSize = () => {
      const parent = document.querySelector(
         parentSelector,
      ) as HTMLElement | null
      if (parent) {
         return {
            width: parent.clientWidth - 16,
            height: parent.clientHeight - 16,
         }
      }
      return { width: 400, height: 200 }
   }
   return (
      <Rnd
         default={{
            x: 40 + Math.random() * 40,
            y: 40 + Math.random() * 40,
            width: size.width,
            height: size.height,
         }}
         size={isMaximized ? getMaxSize() : size}
         position={isMaximized ? { x: 8, y: 8 } : undefined}
         minWidth={180}
         minHeight={80}
         bounds="parent"
         onResizeStop={(_, __, ref) =>
            setSize({ width: ref.offsetWidth, height: ref.offsetHeight })
         }
         disableDragging={isMaximized}
         style={{ zIndex, position: 'absolute' }}
         onMouseDown={() => onFocus(id)}
      >
         <Card className="w-full h-full flex flex-col shadow-md border border-gray-300 bg-white min-w-0 min-h-0 rounded-lg">
            <CardHeader className="flex flex-row justify-end min-h-[28px] min-w-0 bg-white border-b border-gray-300 p-0 rounded-t-lg">
               {/* 버튼 영역 */}
               <div className="flex items-center gap-2 px-2 py-1">
                  {/* 닫기(빨강) */}
                  <button
                     onClick={() => onClose(id)}
                     title="닫기"
                     className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-gray-300 bg-[#ff5f56] flex items-center justify-center group transition"
                     tabIndex={0}
                  >
                     <span className="hidden group-hover:block text-[10px] text-white leading-none">
                        ×
                     </span>
                  </button>
                  {/* 최소화(노랑) */}
                  <button
                     onClick={() => onMinimize(id)}
                     title="최소화"
                     className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-gray-300 bg-[#ffbd2e] flex items-center justify-center group transition"
                     tabIndex={0}
                  >
                     <span className="hidden group-hover:block text-[10px] text-white leading-none">
                        –
                     </span>
                  </button>
                  {/* 최대화(초록) */}
                  <button
                     onClick={() => onMaximize(id)}
                     title="최대화"
                     className="w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border border-gray-300 bg-[#27c93f] flex items-center justify-center group transition"
                     tabIndex={0}
                  >
                     <span className="hidden group-hover:block text-[10px] text-white leading-none">
                        +
                     </span>
                  </button>
               </div>
               {/* 타이틀/빈 영역 */}
               <div className="flex-1 h-full" />
            </CardHeader>
            <CardContent className="flex-1 p-2">
               <textarea
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  className="w-full h-full rounded-none resize-none text-xs bg-transparent border-none outline-none p-0 min-h-0 min-w-0"
                  placeholder="메모를 입력하세요..."
                  spellCheck={false}
               />
            </CardContent>
         </Card>
      </Rnd>
   )
}
