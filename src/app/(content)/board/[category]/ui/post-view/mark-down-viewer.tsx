'use client'

import DOMPurify from 'isomorphic-dompurify' // XSS 방어용
import { marked } from 'marked' // ← 다른 파서를 써도 동일
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

const DynamicPreview = dynamic(
   () => import('@uiw/react-markdown-preview').then((m) => m.default),
   { ssr: false }, // 서버에선 로드 안 함
)

interface Props {
   content: string
}

export default function MarkDownViewer({ content }: Props) {
   const [ready, setReady] = useState(false)
   useEffect(() => setReady(true), [])

   /* 1) UIW 모듈이 아직이면 – 마크다운을 HTML로 변환해 먼저 노출 */
   if (!ready) {
      const html = DOMPurify.sanitize(marked.parse(content))
      return (
         <div className="relative">
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
      <DynamicPreview
         source={content}
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
   )
}
