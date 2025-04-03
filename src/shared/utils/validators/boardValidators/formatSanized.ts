import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export const sanitized = async (arg) => {
   const sanitizedContent = await unified()
      .use(remarkParse) // Markdown 문서를 파싱
      .use(remarkRehype) // 파싱된 Markdown을 HTML로 변환
      .use(rehypeSanitize) // HTML 살균
      .use(rehypeStringify) // HTML을 문자열로 변환
      .process(arg) // 사용자 입력 content 처리

   const resultHtml = String(sanitizedContent.value)
   return resultHtml
}

export const sanitizeHTML = async (htmlString) => {
   const sanitizedContent = await unified()
      .use(remarkParse) // Markdown 문서를 파싱
      .use(rehypeSanitize) // 살균 처리
      .use(rehypeStringify) // 문자열로 변환
      .process(htmlString) // 처리할 HTML 문자열 입력

   const resultHtml = String(sanitizedContent.value)
   return resultHtml // 살균 처리된 안전한 HTML 문자열 반환
}
