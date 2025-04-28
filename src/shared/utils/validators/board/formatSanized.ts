import rehypeParse from 'rehype-parse'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

// 마크다운을 HTML로 변환 후 살균 처리
// 사용자가 입력한 마크다운을 HTML로 변환 후 살균 처리
//   마크다운 → remarkParse → remarkRehype → rehypeSanitize → rehypeStringify → 안전한 HTML
export const markdownToSanitizedHTML = async (markdownContent: string) => {
   const sanitizedContent = await unified()
      .use(remarkParse) // Markdown 문서를 파싱
      .use(remarkRehype) // 파싱된 Markdown을 HTML로 변환
      .use(rehypeSanitize) // HTML 살균
      .use(rehypeStringify) // HTML을 문자열로 변환
      .process(markdownContent) // 사용자 입력 content 처리

   const sanitizedHtmlContent = String(sanitizedContent.value)
   return sanitizedHtmlContent // 살균 처리된 안전한 HTML 문자열 반환
}

// HTML을 살균 처리 후 문자열로 반환
// 살균 처리된 HTML을 문자열로 반환
//    HTML → rehypeParse → rehypeSanitize → rehypeStringify → 안전한 HTML
export const sanitizeHtmlContent = async (htmlString: string) => {
   const sanitizedContent = await unified()
      .use(rehypeParse) // HTML 문서를 파싱
      .use(rehypeSanitize) // 살균 처리
      .use(rehypeStringify) // 문자열로 변환
      .process(htmlString) // 처리할 HTML 문자열 입력

   const sanitizedHtmlContent = String(sanitizedContent.value)
   return sanitizedHtmlContent // 살균 처리된 안전한 HTML 문자열 반환
}
