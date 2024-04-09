'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { ROUTES } from '@/constants/route'
import { CreatePostData } from '@/types/boardTypes'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { createPost } from '@/app/api/board/post/updatePostApi'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import InputPasswordBox from '@/components/common/InputPasswordBox'
import InputNickName from '@/components/common/InputIdBox'
import { useSession } from 'next-auth/react'
import MarkDownEditor from './MarkDownEditor'
import FormSubmitButton from './FormSubmitButton'
import BoardEditorHelpBox from './BoardEditorHelpBox'
import { boardSchema } from './shema/boradFormSchema'

export default function BoardCreateForm() {
   const { data: session } = useSession() // 세션 정보
   const router = useRouter() // 라우터
   const [content, setContent] = useState('') // 글쓰기 폼의 내용을 저장하는 state

   // 글쓰기 폼 제출
   const handleFormSubmit = async (e) => {
      e.preventDefault()

      const sanitizedContent = await unified()
         .use(remarkParse) // Markdown 문서를 파싱
         .use(remarkRehype) // 파싱된 Markdown을 HTML로 변환
         .use(rehypeSanitize) // HTML 살균
         .use(rehypeStringify) // HTML을 문자열로 변환
         .process(content) // 사용자 입력 content 처리

      const resultHtml = String(sanitizedContent.value)

      const parser = new DOMParser()
      const doc = parser.parseFromString(resultHtml, 'text/html')
      const pTags = doc.querySelectorAll('p')
      const thumbnail =
         doc.querySelectorAll('img').length > 0
            ? doc.querySelectorAll('img')[0].src
            : ''

      const summary = Array.from(pTags)
         .map((p) => p.textContent.trim())
         .filter((text) => text.length > 0)
         .join(' ')

      const dataObject: CreatePostData = {
         nickname: e.target.nickname.value,
         title: e.target.title.value,
         content: resultHtml,
         markdown: content,
         summary,
         thumbnail,
      }
      if (!session) {
         dataObject.password = e.target.password.value
      }
      const result = boardSchema.safeParse(dataObject)
      if (result.success === false) {
         alert(result.error)
         return
      }
      await createPost(dataObject).then((postNumber) => {
         router.push(`${ROUTES.BOARD}/1/${postNumber}`)
      })
   }

   return (
      <section className=" w-full  px-3 py-2">
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
         >
            {/* 닉네임 비밀번호 */}
            <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
               {session ? (
                  <>
                     <InputNickName
                        name="nickname"
                        placeholder={session.user.email}
                        disabled
                     />
                     <p className="text-blue-600">로그인 상태</p>
                  </>
               ) : (
                  <>
                     {/* 게시글 작성 닉네임 */}
                     <InputNickName name="nickname" placeholder="닉네임" />
                     {/* 비밀번호 */}
                     <InputPasswordBox name="password" placeholder="패스워드" />
                  </>
               )}
            </div>

            {/* 제목 */}
            <input
               className="border p-2  text-sm "
               type="text"
               name="title"
               placeholder="제목"
               required
            />

            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <BoardEditorHelpBox />
            {/* 글쓰기 마크다운 */}
            <MarkDownEditor content={content} setContent={setContent} />

            {/* 제출 버튼 */}
            <div className="flex gap-6 justify-end my-2">
               <FormSubmitButton
                  label="취소 하기"
                  onClick={() => router.back()}
               />
               <FormSubmitButton label="제출 하기" />
            </div>
         </form>
      </section>
   )
}
