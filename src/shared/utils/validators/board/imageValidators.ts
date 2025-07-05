import { FILE_UPLOAD_RULES } from '@/shared/constants/validation-rules'

const IMAGE_PICKER_CONFIG = {
   IMAGES_TYPES: FILE_UPLOAD_RULES.ALLOWED_TYPES,
   MAX_FILE_SIZE: FILE_UPLOAD_RULES.MAX_SIZE_BYTES,
   MAX_FILE_SIZE_MB: FILE_UPLOAD_RULES.MAX_SIZE_MB,
   MAX_FILE_COUNT: FILE_UPLOAD_RULES.MAX_COUNT,
}

// 파일 사이즈 검사
const checkFileSize = (file: File) => {
   return file.size <= IMAGE_PICKER_CONFIG.MAX_FILE_SIZE
}

export { checkFileSize, IMAGE_PICKER_CONFIG }

// 파일 사이즈 변환
export const validFileSize = (number: number): string => {
   if (number < FILE_UPLOAD_RULES.SIZE_UNITS.BYTES) {
      return `${number.toString()}bytes`
   }
   if (number < FILE_UPLOAD_RULES.SIZE_UNITS.MB) {
      return `${(number / FILE_UPLOAD_RULES.SIZE_UNITS.BYTES).toFixed(1)}KB`
   }
   return `${(number / FILE_UPLOAD_RULES.SIZE_UNITS.MB).toFixed(1)}MB`
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
   const isValidType = IMAGE_PICKER_CONFIG.IMAGES_TYPES.includes(file.type)

   return isValidSize && isValidType
}
