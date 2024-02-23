import IMAGE_PICKER_CONFIG from '@/constants/board/imagePicker'

/**
 * 파일 사이즈 검사
 * @param file
 * @returns
 */
const checkFileSize = (file: File) => {
   return file.size <= IMAGE_PICKER_CONFIG.MAX_FILE_SIZE
}

/**
 * 지정한 파일 타입 검사
 * @param file
 * @returns boolean
 */
const checkFileType = (file: File): boolean => {
   return IMAGE_PICKER_CONFIG.IMAGES_TYPES.includes(file.type)
}

/**
 *  이미지 파일 사이즈 변환 함수
 * @param number
 * @returns string : `${number.toString()}bytes`
 */
export const validFileSize = (number: number): string => {
   if (number < 1024) {
      return `${number.toString()}bytes`
   }
   if (number < 1048576) {
      return `${(number / 1024).toFixed(1)}KB`
   }
   return `${(number / 1048576).toFixed(1)}MB`
}

/**
 * 에러메세지 생성
 * @returns string : 이미지 유형은 ${IMAGE_PICKER_CONFIG.IMAGES_TYPES.join(', ')}이어야 하며, 파일 크기는 ${IMAGE_PICKER_CONFIG.MAX_FILE_SIZE}보다 작아야 합니다.
 */
export const generateErrorMessage = () => {
   const errorMessage = `이미지 유형은 ${IMAGE_PICKER_CONFIG.IMAGES_TYPES.join(', ')}이어야 하며, 파일 크기는 ${validFileSize(IMAGE_PICKER_CONFIG.MAX_FILE_SIZE)}보다 작아야 합니다.`
   return errorMessage
}
/**
 * 파일 사이즈 및 타입 검사 함수
 * @param file
 * @returns
 * boolean : 에러 메세지 와 함께 boolean 값 반환
 */
export const validateFile = (file: File): boolean => {
   const isValidSize = checkFileSize(file)
   const isValidType = checkFileType(file)

   return isValidSize && isValidType
}
