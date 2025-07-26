'use client'

import MarkdownPreview from '@uiw/react-markdown-preview'
import { useTheme } from 'next-themes'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

interface Props {
   content: string
}

export default function MarkDownViewer({ content }: Props) {
   const { theme } = useTheme()
   return (
      <MarkdownPreview
         source={content}
         remarkPlugins={[remarkGfm, remarkBreaks]}
         rehypePlugins={[[rehypeSanitize], [rehypeHighlight, { detect: true }]]}
         className="markdown-preview"
         style={{
            minHeight: '200px',
            backgroundColor: 'transparent',
            padding: 0,
            border: 'none',
            color: 'inherit',
            fontFamily: 'inherit',
         }}
         wrapperElement={{
            'data-color-mode': theme === 'dark' ? 'dark' : 'light',
         }}
      />
   )
}
