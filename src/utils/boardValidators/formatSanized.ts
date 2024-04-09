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
