'use client'

import { Skeleton } from '@/shared/shadcn/ui/skeleton'
import parse from 'html-react-parser'
import { useEffect, useMemo, useState } from 'react'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import { remark } from 'remark'
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import sanitize from 'sanitize-html'
import { throttle } from 'throttle-debounce'

interface MarkdownViewerProps {
   content: string
   codeTheme?: 'github' | 'monokai' | 'dracula' | 'atom-one'
   editing?: boolean
   onConvertFinish?: (html: string) => void
}

// HTML 새니타이징 설정
const sanitizeConfig = {
   allowedTags: [
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'blockquote',
      'p',
      'a',
      'ul',
      'ol',
      'li',
      'b',
      'i',
      'strong',
      'em',
      'strike',
      'code',
      'hr',
      'br',
      'div',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'pre',
      'span',
      'img',
      'del',
      'input',
   ],
   allowedAttributes: {
      a: ['href', 'title', 'target'],
      img: ['src', 'alt', 'title', 'width', 'height'],
      '*': ['class', 'id'],
      input: ['type', 'checked', 'disabled'],
   },
   allowedSchemes: ['http', 'https', 'mailto'],
   allowedIframeHostnames: ['www.youtube.com', 'codesandbox.io', 'codepen.io'],
}

function sanitizeHtml(html: string): string {
   // 이벤트 핸들러 제거
   const presanitized = html.replace(/ on\w+="[^"]*"/g, '')
   return sanitize(presanitized, sanitizeConfig)
}

export default function MarkDownViewer({
   content,
   codeTheme = 'github',
   editing = false,
   onConvertFinish,
}: MarkdownViewerProps) {
   const [html, setHtml] = useState<string>('')
   const [element, setElement] = useState<any>(null)
   const [isLoading, setIsLoading] = useState(true)
   const [hasError, setHasError] = useState(false)
   const [delay, setDelay] = useState(25)

   // Remark 프로세서 설정
   const processor = useMemo(() => {
      return remark()
         .use(remarkBreaks) // 줄바꿈 처리
         .use(remarkGfm) // GitHub Flavored Markdown
         .use(remarkRehype, { allowDangerousHtml: true }) // HTML로 변환
         .use(rehypeSanitize, sanitizeConfig as any) // 보안 처리
         .use(rehypeStringify) // 문자열로 변환
   }, [])

   // 쓰로틀링된 업데이트 함수
   const throttledUpdate = useMemo(() => {
      return throttle(delay, async (markdown: string) => {
         try {
            const result = await processor.process(markdown)
            const processedHtml = String(result)
            const safeHtml = sanitizeHtml(processedHtml)

            // 문서 길이에 따른 동적 지연 조정
            const lines = markdown.split(/\r\n|\r|\n/).length
            const nextDelay = Math.max(
               Math.min(Math.floor(lines * 0.5), 1500),
               22,
            )
            if (nextDelay !== delay) {
               setDelay(nextDelay)
            }

            if (onConvertFinish) {
               onConvertFinish(safeHtml)
            }

            if (!editing) {
               setHtml(safeHtml)
               setIsLoading(false)
               return
            }

            // 편집 모드에서는 React 엘리먼트로 파싱
            try {
               const parsedElement = parse(processedHtml)
               setElement(parsedElement)
               setHasError(false)
            } catch (parseError) {
               console.error('HTML 파싱 오류:', parseError)
               setHasError(true)
               setHtml(safeHtml) // 폴백으로 HTML 사용
            }
            setIsLoading(false)
         } catch (error) {
            console.error('마크다운 처리 오류:', error)
            setHtml('<p>마크다운 처리 중 오류가 발생했습니다.</p>')
            setIsLoading(false)
         }
      })
   }, [delay, editing, onConvertFinish, processor])

   // 마크다운 처리
   useEffect(() => {
      if (content) {
         setIsLoading(true)
         throttledUpdate(content)
      }
   }, [content, throttledUpdate])

   if (isLoading) {
      return (
         <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-3/4" />
         </div>
      )
   }

   const baseStyles = `
      prose dark:prose-invert max-w-none
      prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100
      prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
      prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
      prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
      prose-pre:bg-gray-50 dark:prose-pre:bg-gray-900 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-gray-700 prose-pre:rounded-lg prose-pre:p-4
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-blue-900/20 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r
      prose-ul:list-disc prose-ol:list-decimal prose-li:text-gray-700 dark:prose-li:text-gray-300
      prose-strong:text-gray-900 dark:prose-strong:text-gray-100 prose-strong:font-semibold
      prose-em:text-gray-800 dark:prose-em:text-gray-200 prose-em:italic
      prose-img:rounded-lg prose-img:shadow-sm prose-img:mx-auto prose-img:my-4
      prose-hr:border-gray-300 dark:prose-hr:border-gray-600 prose-hr:my-8
      [&_th]:border [&_th]:border-gray-300 [&_th]:dark:border-gray-600
      [&_th]:px-3 [&_th]:py-2 [&_th]:bg-gray-100 [&_th]:dark:bg-gray-800
      [&_th]:text-gray-900 [&_th]:dark:text-gray-100 [&_th]:font-semibold [&_th]:text-left
      [&_td]:border [&_td]:border-gray-300 [&_td]:dark:border-gray-600
      [&_td]:px-3 [&_td]:py-2 [&_td]:bg-white [&_td]:dark:bg-gray-900
      [&_td]:text-gray-700 [&_td]:dark:text-gray-300
      [&_table]:border-collapse [&_table]:w-full [&_table]:text-sm [&_table]:rounded-lg [&_table]:overflow-hidden
   `

   const themeStyles = {
      github: 'prose-code:text-pink-600 dark:prose-code:text-pink-400',
      monokai: 'prose-code:text-green-400 dark:prose-code:text-green-300',
      dracula: 'prose-code:text-purple-400 dark:prose-code:text-purple-300',
      'atom-one': 'prose-code:text-blue-600 dark:prose-code:text-blue-400',
   }

   return (
      <div
         className="markdown-container"
         style={{ width: '100%', overflowX: 'auto' }}
      >
         {editing ? (
            <div className={`${baseStyles} ${themeStyles[codeTheme]}`}>
               {hasError ? (
                  <div className="text-red-500 p-4 border border-red-300 rounded bg-red-50">
                     HTML 태그 파싱 실패 - 안전 모드로 전환됩니다.
                     <div dangerouslySetInnerHTML={{ __html: html }} />
                  </div>
               ) : (
                  element
               )}
            </div>
         ) : (
            <div
               className={`${baseStyles} ${themeStyles[codeTheme]}`}
               dangerouslySetInnerHTML={{ __html: html }}
            />
         )}
      </div>
   )
}

// 타입 export (다른 컴포넌트에서 사용할 경우)
export type { MarkdownViewerProps }
