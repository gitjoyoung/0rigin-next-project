'use client'

import { Skeleton } from '@/shared/shadcn/ui/skeleton'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import { IPostContent } from '../../types/post-type'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
   loading: () => <Skeleton className="h-4 w-full" />,
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
            source={content.content.map((item) => item.text).join('\n')}
            remarkPlugins={[remarkBreaks]}
            rehypePlugins={[rehypeSanitize]}
         />
      </div>
   )
}
