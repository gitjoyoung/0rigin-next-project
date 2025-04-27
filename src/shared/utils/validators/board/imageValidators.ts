const MAX_FILE_SIZE_MB = 10
const IMAGE_PICKER_CONFIG = {
   IMAGES_TYPES: ['image/png', 'image/jpeg', 'image/jpg'],
   MAX_FILE_SIZE: MAX_FILE_SIZE_MB * 1024 * 1024, // 20MB
   MAX_FILE_SIZE_MB,
   MAX_FILE_COUNT: 10, // 최대 10개의 이미지
}
// 파일 사이즈 검사
const checkFileSize = (file: File) => {
   return file.size <= IMAGE_PICKER_CONFIG.MAX_FILE_SIZE
}
// 파일 타입 검사
const checkFileType = (file: File): boolean => {
   return IMAGE_PICKER_CONFIG.IMAGES_TYPES.includes(file.type)
}
// 파일 사이즈 변환
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
 */
export const validateFile = (file: File): boolean => {
   const isValidSize = checkFileSize(file)
   const isValidType = checkFileType(file)

   return isValidSize && isValidType
}
