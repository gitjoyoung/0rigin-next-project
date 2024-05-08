import CustomDisclosure from '@/components/common/CustomDisclosure'
import InputNickName from '@/components/common/InputIdBox'
import InputPasswordBox from '@/components/common/InputPasswordBox'
import React, { useEffect, useState } from 'react'
import { TIP_CONTENT } from '@/constants/board/markDownTip'
import { useRouter } from 'next/navigation'
import { sanitized } from '@/utils/boardValidators/formatSanized'
import { CreatePostData, Post } from '@/types/boardTypes'
import { useSession } from 'next-auth/react'
import MarkDownEditor from './MarkDownEditor'
import FormSubmitButton from './FormSubmitButton'
import { authSchema, boardSchema } from './shema/boradFormSchema'

interface Props {
   editData?: Post | null
   submitPost?: (arg) => void
}

export default function BoardForm({ submitPost, editData = null }: Props) {
   const { back } = useRouter()
   const { data: session } = useSession() // 세션 정보
   const [markdownContent, setMarkdownContent] = useState('')

   useEffect(() => {
      setMarkdownContent(editData?.markdown || '')
   }, [editData])

   const getFirstImageSrc = (html): string => {
      const imgTag = html.querySelectorAll('img')
      let thumbnail = ''
      if (imgTag.length > 0) {
         thumbnail = imgTag[0].src
      }
      return thumbnail
   }
   const getPtg = (html): string => {
      const pTag = html.querySelectorAll('p')
      let summary = ''
      if (pTag.length > 0) {
         summary = Array.from(pTag)
            .map((p) => (p as HTMLElement).textContent.trim())
            .filter((text) => text.length > 0)
            .join(' ')
      }
      return summary
   }

   const parseHtmlToDocument = (markdown) => {
      const htmlParser = new DOMParser()
      const htmlDocument = htmlParser.parseFromString(markdown, 'text/html')
      return htmlDocument
   }

   const handleFormSubmit = async (e): Promise<void> => {
      e.preventDefault()

      const loginId = session?.user?.email.split('@')[0]
      const loginPassword = session?.user?.email.split('@')[0]

      const nickname = loginId || e.target.nickname.value.replace(/\s+/g, '')
      const password =
         loginPassword || e.target.password.value.replace(/\s+/g, '')
      // 닉네임과 비밀번호가 유효한지 확인 후 에러 메시지 출력
      const authValidation = authSchema.safeParse({ nickname, password })
      if (authValidation.success === false) {
         alert(authValidation.error)
         return
      }

      const title = e.target.title.value
      const sanitizedHTML = await sanitized(markdownContent)
      // 제목과 내용이 유효한지 확인 후 에러 메시지 출력
      const boardResult = boardSchema.safeParse({
         title,
         content: sanitizedHTML,
      })
      if (boardResult.success === false) {
         alert(boardResult.error)
         return
      }

      // 썸네일과 요약 정보 추출
      const doc = parseHtmlToDocument(sanitizedHTML)
      const thumbnail = getFirstImageSrc(doc)
      const summary = getPtg(doc)

      const dataObject: CreatePostData = {
         password,
         nickname,
         title: e.target.title.value,
         content: sanitizedHTML,
         markdown: markdownContent,
         summary,
         thumbnail,
      }

      await submitPost(dataObject)
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
                     <InputNickName
                        name="nickname"
                        placeholder="닉네임"
                        defaultValue={editData?.nickname || ''}
                     />
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
               defaultValue={editData?.title || ''}
               required
            />

            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <CustomDisclosure
               title="Mark Down 문법"
               tip={TIP_CONTENT}
               color="purple"
            />
            {/* 글쓰기 마크다운 */}
            <MarkDownEditor
               markDownContent={markdownContent}
               setMarkDownContent={setMarkdownContent}
            />

            {/* 제출 버튼 */}
            <div className="flex gap-6 justify-end my-2">
               <FormSubmitButton label="취소 하기" onClick={() => back()} />
               <FormSubmitButton label="제출 하기" />
            </div>
         </form>
      </section>
   )
}
