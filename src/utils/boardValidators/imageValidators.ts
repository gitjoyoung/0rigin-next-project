import IMAGE_PICKER_CONFIG from '@/constants/board/imagePicker'

/**
 *  이미지 파일을 검사하는 함수
 * @param number
 * @returns
 */
const validFileSize = (number: number): string => {
   if (number < 1024) {
      return `${number.toString()}bytes`
   }
   if (number >= 1024 && number < 1048576) {
      return `${(number / 1024).toFixed(1)}KB`
   }
   if (number >= 1048576) {
      return `${(number / 1048576).toFixed(1)}MB`
   }
   return '' // Add this line to return a value at the end of the function
}

/**
 *  파일 타입을 검사하는 함수
 * @param file
 * @param type
 * @returns
 */
export const validFileTypes = (file: File, type: string[]) => {
   const isWithinFileSizeLimit = file.size <= IMAGE_PICKER_CONFIG.MAX_FILE_SIZE

   if (!type.includes(file.type) || !isWithinFileSizeLimit) {
      alert(
         `${type} 이미지만 업로드하고, 파일 크기는 ${IMAGE_PICKER_CONFIG.MAX_FILE_SIZE}보다 작아야 합니다.`,
      )
      return false
   }

   return true
}

export default validFileSize
