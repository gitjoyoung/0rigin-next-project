import { storage } from '@/lib/firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import dayjs from 'dayjs' // Import the 'dayjs' library

// 이미지를 Firebase Storage에 업로드하는 함수
export default async function uploadImageToFirebase(compressedFile: Blob) {
   // 스토리지 내의 'images' 폴더에 파일을 저장하기 위한 참조 생성
   // 파일명으로 현재 시간을 사용하여 고유한 이름을 생성

   const storageRef = ref(storage, `images/${dayjs()}`)

   try {
      // Blob을 Firebase Storage에 업로드
      const snapshot = await uploadBytes(storageRef, compressedFile)

      // 업로드된 파일의 다운로드 URL을 얻음
      const downloadURL = await getDownloadURL(snapshot.ref)

      return downloadURL // 업로드된 파일의 URL 반환
   } catch (error) {
      console.error('Error uploading file:', error)
      return null
   }
}
