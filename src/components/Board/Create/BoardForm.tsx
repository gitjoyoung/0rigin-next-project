import CustomDisclosure from '@/components/common/CustomDisclosure'
import InputNickName from '@/components/common/InputIdBox'
import InputPasswordBox from '@/components/common/InputPasswordBox'
import React, { useState } from 'react'
import { TIP_CONTENT } from '@/constants/board/markDownTip'
import { useRouter } from 'next/navigation'
import { sanitized } from '@/utils/boardValidators/formatSanized'
import { CreatePostData, EditPostData } from '@/types/boardTypes'
import { useSession } from 'next-auth/react'
import MarkDownEditor from './MarkDownEditor'
import FormSubmitButton from './FormSubmitButton'
import { authSchema, boardSchema } from './shema/boradFormSchema'

interface Props {
   editData?: EditPostData | null
   submitPost?: (arg: any) => void
}

export default function BoardForm({ submitPost, editData = null }: Props) {
   const { back } = useRouter()
   const { data: session } = useSession() // 세션 정보
   const [content, setContent] = useState(editData?.markdown) // 글쓰기 폼의 내용을 저장하는 state
   const handleFormSubmit = async (e) => {
      e.preventDefault()
      const resultHtml = await sanitized(content)

      const parser = new DOMParser()
      const doc = parser.parseFromString(resultHtml, 'text/html')
      const images = doc.querySelectorAll('img')
      const pTags = doc.querySelectorAll('p')
      const thumbnail = images.length > 0 ? images[0].src : ''

      const summary = Array.from(pTags)
         .map((p) => p.textContent.trim())
         .filter((text) => text.length > 0)
         .join(' ')

      const dataObject: CreatePostData = {
         nickname:
            session?.user?.email.split('@')[0] ||
            e.target.nickname.value.replace(/\s+/g, ''),
         title: e.target.title.value,
         content: resultHtml,
         markdown: content,
         summary,
         thumbnail,
      }

      if (!session) {
         dataObject.password = e.target.password.value
         const authResult = authSchema.safeParse(dataObject)
         if (authResult.success === false) {
            alert(authResult.error)
            return
         }
      }
      const boardResult = boardSchema.safeParse(dataObject)
      if (boardResult.success === false) {
         alert(boardResult.error)
         return
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
               value={editData?.title || ''}
               required
            />

            {/* 내용 contentEditTable 로 태그를 추가함 */}
            <CustomDisclosure
               title="TIP : 마크다운 사용법"
               tip={TIP_CONTENT}
               color="purple"
            />
            {/* 글쓰기 마크다운 */}
            <MarkDownEditor content={content} setContent={setContent} />

            {/* 제출 버튼 */}
            <div className="flex gap-6 justify-end my-2">
               <FormSubmitButton label="취소 하기" onClick={() => back()} />
               <FormSubmitButton label="제출 하기" />
            </div>
         </form>
      </section>
   )
}
