import { IPostContent } from '../../types/post-type'

export default function HtmlViewer({ content }: { content: IPostContent }) {
   // 서버에서 가져온 HTML 콘텐츠를 직접 표시
   console.log('content', content)
   return (
      <div className="my-5 min-h-[150px]">
         <div
            className="prose prose-slate max-w-none dark:prose-invert prose-headings:font-bold prose-h1:text-2xl prose-h2:text-xl prose-h3:text-lg prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-p:my-4 prose-img:rounded-md prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-pre:p-2 prose-pre:rounded-md prose-code:text-red-500 dark:prose-code:text-red-400 prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:pl-4 prose-blockquote:italic prose-ul:list-disc prose-ol:list-decimal whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: content.html }}
         />
      </div>
   )
}
