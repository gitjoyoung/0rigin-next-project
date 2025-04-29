import imageCompression from 'browser-image-compression'

export type ImageFileType =
   | 'image/jpeg'
   | 'image/png'
   | 'image/webp'
   | 'image/gif'
   | 'image/jpg'

export interface CompressImageOptions {
   maxSizeMB?: number // 최대 파일 크기 (MB)
   maxWidthOrHeight?: number // 최대 너비/높이
   useWebWorker?: boolean // 웹 워커 사용 브라우저에서 별도의 스레드를 만들어 별도의 작업을 처리하는 기능
   fileType?: ImageFileType // 파일 타입
}

export interface CompressImageResult {
   status: 'success' | 'error'
   file: File
   errorMessage?: string
}

const defaultOptions: CompressImageOptions = {
   maxSizeMB: 0.1, // 100KB로 제한 (1920 크기로 압축 시 일반적으로 100KB 이하)
   maxWidthOrHeight: 1920,
   useWebWorker: true,
   fileType: 'image/jpeg',
}

/**
 * 이미지 압축 함수
 * @param file 압축할 이미지 파일
 * @param options 압축 옵션
 * {
 *   maxSizeMB: 0.1, // 최대 파일 크기 (MB) - 기본값 100KB
 *   maxWidthOrHeight: 1920, // 최대 너비/높이
 *   fileType: 'image/jpeg' | 'image/png' | 'image/webp',
 * }
 * @returns 압축된 이미지 파일
 */
export const compressImage = async (
   file: File,
   options?: CompressImageOptions,
): Promise<CompressImageResult> => {
   const finalOptions = {
      ...defaultOptions,
      ...options,
   }

   try {
      const compressedFile = await imageCompression(file, finalOptions)
      return {
         status: 'success',
         file: compressedFile,
      }
   } catch (error) {
      const errorMessage =
         error instanceof Error
            ? error.message
            : '알 수 없는 오류가 발생했습니다'
      return {
         status: 'error',
         file: file,
         errorMessage,
      }
   }
}
