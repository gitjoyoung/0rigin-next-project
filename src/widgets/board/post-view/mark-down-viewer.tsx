'use client'

import MarkdownPreview from '@uiw/react-markdown-preview'
import rehypeHighlight from 'rehype-highlight'

interface Props {
   content: string
}

export default function MarkDownViewer({ content }: Props) {
   return (
      <MarkdownPreview
         source={content}
         rehypePlugins={[rehypeHighlight]}
         style={{
            minHeight: '200px',
            backgroundColor: 'transparent',
            padding: 0,
            border: 'none',
            color: 'inherit',
            fontFamily: 'inherit',
         }}
      />
   )
}
