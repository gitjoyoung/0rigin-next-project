import React from 'react'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import remarkBreaks from 'remark-breaks'
import rehypeSanitize from 'rehype-sanitize'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
})
export default function MarkDownViewer({ content }) {
   return (
      <div
         data-color-mode="light"
         className="markdown-list whitespace-pre-wrap p-1 my-3 min-h-56"
      >
         <MarkdownPreview
            source={content}
            remarkPlugins={[remarkBreaks]}
            rehypePlugins={[[rehypeSanitize]]}
         />
      </div>
   )
}
