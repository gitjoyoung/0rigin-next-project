'use client'

import BoardComment from '@/components/Board/Comment/BoardCommentsList'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import dayjs from 'dayjs'
import Link from 'next/link'
import BoardModal from '../BoardModal'
import BoardReadTitle from './BoardReadTitle'

export default function BoardRead({ postid }) {
   const router = useRouter()
   const [readData, setReadData] = useState(null)

   const topRef = useRef(null)

   const fetchReadData = async () => {
      const options = {
         url: `${process.env.NEXT_PUBLIC_API_URL}board/${postid}`,
         method: 'GET',
      }
      try {
         const res = await axios(options)
         const { data } = res
         console.log('게시글 데이타', data)
         setReadData(data)
      } catch (error) {
         console.log(error)
         setReadData('')
      }
   }
   useEffect(() => {
      fetchReadData()
      window.scrollTo(0, 0)
   }, [])

   /** 모달 관련 */
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [modalMode, setModalMode] = useState<'edit' | 'delete'>('edit')
   const handleEdit = () => {
      setModalMode('edit')
      setIsModalOpen(true)
   }

   const handleDelete = () => {
      setModalMode('delete')
      setIsModalOpen(true)
   }

   if (readData === null) {
      return <>없음</>
   }
   const { title, nickname, like, unlike, body, timestamp } = readData
   const date = timestamp
      ? dayjs(timestamp).format('YYYY.MM.DD HH:mm:ss')
      : '날자 없음'

   const fetchUpdateLike = async (isLike) => {
      const updatedValue = isLike ? readData.like + 1 : readData.unlike + 1
      const evaluationType = isLike ? 'like' : 'unlike'
      const options = {
         url: `${process.env.NEXT_PUBLIC_API_URL}board/${postid}`,
         method: 'PATCH',
         data: { [evaluationType]: updatedValue },
      }
      try {
         const { data } = await axios(options)
         setReadData(data)
      } catch (error) {
         console.log(error)
      }
   }
   return (
      <section className="  mt-1 " ref={topRef}>
         {isModalOpen && (
            <BoardModal
               id={postid}
               onClose={() => setIsModalOpen(false)}
               deleteFlag={modalMode === 'delete'}
               editFlag={modalMode === 'edit'}
            />
         )}
         <BoardReadTitle
            title={title}
            nickname={nickname}
            like={like}
            date={date}
         />
         <div className="flex justify-end gap-3 my-2 ">
            <button className="px-3 py-1" type="button" onClick={handleEdit}>
               수정
            </button>
            <button className="px-3 py-1" type="button" onClick={handleDelete}>
               삭제
            </button>
         </div>
         <div
            className="min-h-[30vh] px-2"
            dangerouslySetInnerHTML={{ __html: body }}
         />
         <div className="flex justify-center gap-6 mt-5 mb-5">
            <div className="flex flex-col justify-center items-center">
               <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faThumbsUp} rotation={180} />
                  <p> {-unlike || 0}</p>
               </div>
               <button type="button" onClick={() => fetchUpdateLike(false)}>
                  내리 꽂기
               </button>
            </div>
            <div className="flex flex-col justify-center items-center">
               <div className="flex gap-2 items-center">
                  <FontAwesomeIcon icon={faThumbsUp} />
                  <p>{like || 0}</p>
               </div>

               <button type="button" onClick={() => fetchUpdateLike(true)}>
                  추천 하기
               </button>
            </div>
         </div>

         <BoardComment postid={postid} />
         <div className="flex justify-between p-1 items-center">
            <Link href={`/board/read/${parseInt(postid, 10) - 1} `}>
               <p> 이전 글</p>
            </Link>
            <button
               type="button"
               className="px-2 py-2"
               onClick={() => router.push('/board')}
            >
               목록
            </button>
            <Link href={`/board/read/${parseInt(postid, 10) + 1}`}>
               <p>다음 글</p>
            </Link>
         </div>
      </section>
   )
}
