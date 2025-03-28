'use client'
import dynamic from 'next/dynamic'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
   loading: () => <p>게시글 불러오는 중...</p>,
})
export default function MarkDownViewer({ content }) {
   return (
      <MarkdownPreview
         style={{
            minHeight: '56px',
            backgroundColor: 'transparent',
         }}
         source={content}
         remarkPlugins={[remarkBreaks]}
         rehypePlugins={[[rehypeSanitize]]}
      />
   )
}
