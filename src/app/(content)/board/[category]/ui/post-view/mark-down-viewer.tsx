'use client'

import { marked } from 'marked' // ← 다른 파서를 써도 동일
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import rehypeHighlight from 'rehype-highlight'

const DynamicPreview = dynamic(
   () => import('@uiw/react-markdown-preview').then((m) => m.default),
   { ssr: false }, // 서버에선 로드 안 함
)

interface Props {
   content: string
}

// 코드 하이라이팅 스타일
const codeStyles = `
  /* 코드 블록 스타일링 */
  .wmde-markdown pre {
    background-color: #f6f8fa !important;
    border: 1px solid #e1e4e8 !important;
    border-radius: 6px !important;
    padding: 16px !important;
    overflow: auto !important;
  }

  .wmde-markdown code {
    background-color: #f6f8fa !important;
    color: #24292e !important;
    padding: 2px 4px !important;
    border-radius: 3px !important;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace !important;
  }

  .wmde-markdown pre code {
    background-color: transparent !important;
    padding: 0 !important;
    color: inherit !important;
  }

  /* 다크 모드 코드 스타일링 */
  .dark .wmde-markdown pre {
    background-color: #161b22 !important;
    border-color: #30363d !important;
  }

  .dark .wmde-markdown code {
    background-color: #161b22 !important;
    color: #e6edf3 !important;
  }

  .dark .wmde-markdown pre code {
    background-color: transparent !important;
    color: inherit !important;
  }

  /* 하이라이트된 코드 토큰 스타일 */
  .hljs-keyword { color: #d73a49; }
  .hljs-string { color: #032f62; }
  .hljs-comment { color: #6a737d; }
  .hljs-number { color: #005cc5; }
  .hljs-function { color: #6f42c1; }
  .hljs-variable { color: #e36209; }

  /* 다크 모드 하이라이트 토큰 */
  .dark .hljs-keyword { color: #ff7b72; }
  .dark .hljs-string { color: #a5d6ff; }
  .dark .hljs-comment { color: #8b949e; }
  .dark .hljs-number { color: #79c0ff; }
  .dark .hljs-function { color: #d2a8ff; }
  .dark .hljs-variable { color: #ffa657; }
`

export default function MarkDownViewer({ content }: Props) {
   const [ready, setReady] = useState(false)
   useEffect(() => setReady(true), [])

   if (!ready) {
      const html = marked.parse(content)
      return (
         <div className="relative">
            <style>{codeStyles}</style>
            <article
               dangerouslySetInnerHTML={{ __html: html }}
               className="prose"
            />
            <div className="absolute inset-0 bg-background/80 animate-pulse z-10 pointer-events-none" />
         </div>
      )
   }

   /* 2) 모듈 로드 완료 → UIW Preview 로 교체 */
   return (
      <>
         <style>{codeStyles}</style>
         <DynamicPreview
            source={content}
            rehypePlugins={[rehypeHighlight]}
            style={{
               backgroundColor: 'transparent',
               padding: 0,
               border: 'none',
               fontSize: '16px',
               lineHeight: '1.5',
               color: 'inherit',
               fontFamily: 'inherit',
            }}
         />
      </>
   )
}
