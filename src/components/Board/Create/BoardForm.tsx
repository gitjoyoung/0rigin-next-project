import CustomDisclosure from '@/components/common/CustomDisclosure'
import React, { useState } from 'react'
import { TIP_CONTENT } from '@/constants/board/markDownTip'
import { sanitized } from '@/utils/boardValidators/formatSanized'
import { CreatePostData, Post } from '@/types/boardTypes'
import { useSession } from 'next-auth/react'
import InputNickName from '@/components/common/InputIdBox'
import InputPasswordBox from '@/components/common/InputPasswordBox'
import MarkDownEditor from './MarkDownEditor'
import { boardSchema } from './shema/boradFormSchema'
import BoardSubmitGroups from './BoardSubmitGroups'
import BoardSubjectInput from './BoardSubjectInput'

interface Props {
   editData?: Post | null
   submitPost: (formData: CreatePostData) => void
}

export default function BoardForm({ submitPost, editData = null }: Props) {
   const { data: session } = useSession() // 세션 정보
   const sessionEmail = session?.user?.email.replace(/@.*/, '')?.split('@')[0] // 세션 이메일
   const [markdownContent, setMarkdownContent] = useState(
      editData?.markdown || '',
   )
   const getFirstImageSrc = (htmlString: string): string => {
      const htmlParser = new DOMParser()
      const htmlDocument = htmlParser.parseFromString(htmlString, 'text/html')
      const imgTag = htmlDocument.querySelectorAll('img')
      let firstImageSrc = ''
      if (imgTag.length > 0) {
         firstImageSrc = imgTag[0].src
      }
      return firstImageSrc
   }
   const getParagraphText = (htmlString: string): string => {
      const htmlParser = new DOMParser()
      const htmlDocument = htmlParser.parseFromString(htmlString, 'text/html')
      const pTag = htmlDocument.querySelectorAll('p')
      let pText = ''
      if (pTag.length > 0) {
         pText = Array.from(pTag)
            .map((p) =>
               (p as HTMLElement).textContent?.trim().replace(/\s+/g, ' '),
            ) // 중복 공백을 한 개의 공백으로 치환
            .filter((text) => text && text.length > 0)
            .join(' ')
            .substring(0, 100)
      }
      return pText
   }
   const handleFormSubmit = async (
      e: React.FormEvent<HTMLFormElement>,
   ): Promise<void> => {
      e.preventDefault()
      const form = e.currentTarget
      const nickname = form.nickname?.value
      const password = form.password?.value
      const subject = form.subject.value

      console.log(nickname, password, subject)
      // 마크다운 에디터에서 스테이트 사용
      const markdown = markdownContent
      // 마크다운 전처리
      const content = await sanitized(markdown)
      const thumbnail = await getFirstImageSrc(content)
      const summary = await getParagraphText(content)
      const formData: CreatePostData = {
         nickname,
         password,
         title: subject,
         content,
         markdown,
         summary,
         thumbnail,
      }
      // 스키마 검증
      const validateSchema = await boardSchema.safeParse({
         ...formData,
      })
      if (validateSchema.success === false) {
         console.log(validateSchema.error)
         return
      }
      // 해당 props로 받은 함수 실행 생성 또는 수정
      await submitPost(formData)
   }

   return (
      <section className=" w-full  px-3 py-2">
         <form
            className="w-full flex flex-col gap-2"
            onSubmit={(e) => handleFormSubmit(e)}
         >
            {/* 닉네임 비밀번호 */}
            <div className="flex flex-wrap items-center gap-2 mt-2 mb-2 text-sm ">
               <InputNickName
                  name="nickname"
                  placeholder={sessionEmail}
                  defaultValue={sessionEmail || '닉네임'}
                  disabled={!!session}
               />
               {sessionEmail ? (
                  <p className="text-blue-600">로그인 상태</p>
               ) : (
                  <InputPasswordBox name="password" placeholder="패스워드" />
               )}
            </div>
            {/* 제목 */}
            <BoardSubjectInput name="subject" title={editData?.title} />
            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <CustomDisclosure
               title="Mark Down 문법"
               text={TIP_CONTENT}
               color="purple"
            />
            {/* 글쓰기 마크다운 */}
            <MarkDownEditor
               markDownContent={markdownContent}
               setMarkDownContent={setMarkdownContent}
            />
            {/* 제출 버튼 */}
            <BoardSubmitGroups />
         </form>
      </section>
   )
}
