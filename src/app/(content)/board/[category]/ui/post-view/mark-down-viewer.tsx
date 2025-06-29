'use client'

import { Skeleton } from '@/shared/shadcn/ui/skeleton'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
   loading: () => (
      <div className="flex flex-col gap-2">
         <Skeleton className="h-4 w-3/4" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-5/6" />
         <Skeleton className="h-4 w-4/5" />
         <Skeleton className="h-4 w-3/4" />
      </div>
   ),
})

export default function MarkDownViewer({ content }: { content: string }) {
   const [markdownText, setMarkdownText] = useState<string>('')

   // 디버깅용 코드
   useEffect(() => {
      const isString = typeof content === 'string'
      let markdownContent = ''
      if (isString) {
         markdownContent = content as string
      } else if (content && typeof content === 'object') {
         markdownContent = content || ''
      }
      setMarkdownText(markdownContent)
   }, [content])

   return (
      <div style={{ width: '100%', overflowX: 'auto' }}>
         <MarkdownPreview
            style={{
               backgroundColor: 'transparent',
               color: 'var(--foreground)',
               fontFamily: 'inherit',
               maxWidth: '100%',
               width: '100%',
            }}
            source={markdownText}
            remarkPlugins={[remarkBreaks, remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            className="prose dark:prose-invert max-w-none font-dos [&_*]:font-dos 
                      [&_table]:w-full [&_table]:table-fixed [&_table]:border-collapse
                      [&_th]:border [&_th]:border-gray-300 [&_th]:dark:border-gray-600
                      [&_th]:px-2 [&_th]:py-2 [&_th]:bg-gray-100 [&_th]:dark:bg-gray-800
                      [&_th]:text-gray-900 [&_th]:dark:text-gray-100
                      [&_td]:border [&_td]:border-gray-300 [&_td]:dark:border-gray-600
                      [&_td]:px-2 [&_td]:py-2 [&_td]:break-words [&_td]:max-w-0
                      [&_td]:bg-white [&_td]:dark:bg-gray-900
                      [&_td]:text-gray-900 [&_td]:dark:text-gray-100"
         />
      </div>
   )
}
