'use client'

import { Skeleton } from '@/shared/shadcn/ui/skeleton'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { IPostContent } from '../../../types/post-type'

const MarkdownPreview = dynamic(() => import('@uiw/react-markdown-preview'), {
   ssr: false,
   loading: () => (
      <div className="space-y-4">
         <Skeleton className="h-4 w-3/4" />
         <Skeleton className="h-4 w-full" />
         <Skeleton className="h-4 w-5/6" />
         <Skeleton className="h-4 w-4/5" />
         <Skeleton className="h-4 w-3/4" />
      </div>
   ),
})

// 테스트용 예시 마크다운
const EXAMPLE_MARKDOWN = `
# 마크다운 예시

이것은 테스트용 마크다운 예시입니다.

## 지원하는 기능
- 목록 항목
- **굵은 글씨**
- *기울임체*

> 인용구도 표시됩니다.

\`\`\`javascript
// 코드 블록도 지원합니다
console.log('Hello, world!');
\`\`\`
`

export default function MarkDownViewer({
   content,
}: {
   content: IPostContent | string
}) {
   const [markdownText, setMarkdownText] = useState<string>('')

   // 디버깅용 코드
   useEffect(() => {
      console.log('전체 content 객체:', content)

      // content가 문자열인지 객체인지 확인
      const isString = typeof content === 'string'
      console.log('content가 문자열입니까?', isString)

      let markdownContent = ''

      if (isString) {
         // content가 문자열인 경우 직접 사용
         markdownContent = content as string
      } else if (content && typeof content === 'object') {
         // content가 객체인 경우 markdown 속성 사용
         markdownContent = (content as IPostContent)?.markdown || ''
      }

      console.log('사용할 마크다운 내용:', markdownContent)
      console.log('내용 타입:', typeof markdownContent)
      console.log('내용 길이:', markdownContent?.length || 0)

      // 마크다운 텍스트 설정
      setMarkdownText(markdownContent)
   }, [content])

   // 마크다운이 비어있는 경우 예시 텍스트 사용
   const displayMarkdown = markdownText || EXAMPLE_MARKDOWN

   return (
      <div className="my-5 px-3 min-h-[150px]">
         <MarkdownPreview
            style={{
               backgroundColor: 'transparent',
               color: 'var(--foreground)',
               fontFamily: 'inherit',
            }}
            source={displayMarkdown}
            remarkPlugins={[remarkBreaks, remarkGfm]}
            rehypePlugins={[rehypeSanitize]}
            className="prose dark:prose-invert max-w-none font-sans [&_*]:font-sans"
         />
      </div>
   )
}
