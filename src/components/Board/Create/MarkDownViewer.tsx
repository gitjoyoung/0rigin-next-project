import React from 'react'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
})
export default function MarkDownViewer({ content }) {
   return (
      <div className="custom-list whitespace-pre-line px-3 sm:px-6">
         <MarkdownPreview source={content} />
      </div>
   )
}
