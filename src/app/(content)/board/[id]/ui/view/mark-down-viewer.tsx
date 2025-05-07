'use client'

import { Skeleton } from '@/shared/shadcn/ui/skeleton'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import { IPostContent } from '../../../types/post-type'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
   loading: () => (
      <div className="space-y-4">
         <Skeleton className="h-4 w-3/4" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-5/6" />
         <Skeleton className="h-4 w-4/5" />
         <Skeleton className="h-4 w-3/4" />
      </div>
   ),
})

export default function MarkDownViewer({ content }: { content: IPostContent }) {
   return (
      <div className="my-5 min-h-[150px]">
         <MarkdownPreview
            style={{
               backgroundColor: 'transparent',
               color: 'inherit',
               fontFamily: 'inherit',
            }}
            source={content.markdown}
            remarkPlugins={[remarkBreaks]}
            rehypePlugins={[rehypeSanitize]}
         />
      </div>
   )
}
