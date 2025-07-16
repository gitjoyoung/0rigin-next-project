'use client'

import MarkdownPreview from '@uiw/react-markdown-preview'
import rehypeHighlight from 'rehype-highlight'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'

interface Props {
   content: string
}

export default function MarkDownViewer({ content }: Props) {
   return (
      <MarkdownPreview
         source={content}
         remarkPlugins={[remarkGfm, remarkBreaks]}
         rehypePlugins={[
            [
               rehypeSanitize,
               {
                  tagNames: [
                     'h1',
                     'h2',
                     'h3',
                     'h4',
                     'h5',
                     'h6',
                     'p',
                     'br',
                     'strong',
                     'em',
                     'ul',
                     'ol',
                     'li',
                     'blockquote',
                     'code',
                     'pre',
                     'a',
                     'img',
                     'hr',
                     'table',
                     'thead',
                     'tbody',
                     'tr',
                     'th',
                     'td',
                  ],
                  attributes: {
                     '*': ['className'],
                     a: ['href', 'title'],
                     img: ['src', 'alt', 'title'],
                     code: ['className'],
                     pre: ['className'],
                  },
               },
            ],
            [rehypeHighlight, { detect: true }],
         ]}
         className="markdown-preview"
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
