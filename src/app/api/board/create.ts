import { storage } from '@/lib/firebase'
import axios from 'axios'
import dayjs from 'dayjs'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

interface DataObject {
   nickname: string
   password: string
   title: string
   body: string
   timestamp: number
   isPublic: boolean
   category: string
}

/**
 * 글쓰기 폼을 서버로 전송하는 함수
 * @param dataObject
 * @returns
 */
export const fetchCreateForm = async (dataObject: DataObject): Promise<any> => {
   const options = {
      url: `${process.env.NEXT_PUBLIC_API_URL}board`,
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      data: JSON.stringify(dataObject),
   }

   try {
      const res = await axios(options)
      const { data } = res
      return data
   } catch (error) {
      console.log('error:', error)
   }

   return null
}

// 예를 들어, 사용자가 선택한 이미지 파일을 업로드하는 함수
export const uploadImageToFirebase = async (compressedFile: Blob) => {
   // 스토리지 내의 'images' 폴더에 파일을 저장하기 위한 참조 생성
   // 파일명으로 현재 시간을 사용하여 고유한 이름을 생성

   const storageRef = ref(storage, `images/${dayjs()}`)

   try {
      // Blob을 Firebase Storage에 업로드
      const snapshot = await uploadBytes(storageRef, compressedFile)

      // 업로드된 파일의 다운로드 URL을 얻음
      const downloadURL = await getDownloadURL(snapshot.ref)
      console.log('File available at', downloadURL)

      return downloadURL // 업로드된 파일의 URL 반환
   } catch (error) {
      console.error('Error uploading file:', error)
      return null
   }
}
