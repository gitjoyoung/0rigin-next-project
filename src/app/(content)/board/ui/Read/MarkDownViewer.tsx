'use client'

import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
   loading: () => <p>글 불러오는 중...</p>,
})
export default function MarkDownViewer({ content }) {
   return (
      <div className="markdown-list whitespace-pre-wrap p-1 my-3 min-h-56">
         <MarkdownPreview
            source={content}
            remarkPlugins={[remarkBreaks]}
            rehypePlugins={[[rehypeSanitize]]}
         />
      </div>
   )
}
