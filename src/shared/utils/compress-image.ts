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
   maxHeight?: number // 최대 높이만 제한
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

const ALLOWED_MIME_TYPES: ImageFileType[] = [
   'image/jpeg',
   'image/png',
   'image/webp',
   'image/gif',
   'image/jpg',
]

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
   // 파일 타입 검증
   if (!ALLOWED_MIME_TYPES.includes(file.type as ImageFileType)) {
      return {
         status: 'error',
         file: file,
         errorMessage:
            '허용되지 않은 파일 형식입니다. 이미지 파일만 업로드 가능합니다.',
      }
   }

   const finalOptions = {
      ...defaultOptions,
      ...options,
   }

   try {
      let processedFile = file

      // 높이 제한이 있으면 먼저 리사이즈
      if (options?.maxHeight) {
         processedFile = await new Promise<File>((resolve) => {
            const img = new Image()
            img.onload = () => {
               const canvas = document.createElement('canvas')
               const ctx = canvas.getContext('2d')!

               let { width, height } = img

               if (height > options.maxHeight!) {
                  const ratio = options.maxHeight! / height
                  width = Math.floor(width * ratio)
                  height = options.maxHeight!
               }

               canvas.width = width
               canvas.height = height
               ctx.drawImage(img, 0, 0, width, height)

               canvas.toBlob(
                  (blob) => {
                     const resizedFile = new File([blob!], file.name, {
                        type: file.type,
                        lastModified: Date.now(),
                     })
                     resolve(resizedFile)
                  },
                  file.type,
                  0.9,
               )
            }
            img.src = URL.createObjectURL(file)
         })
      }

      const compressedFile = await imageCompression(processedFile, finalOptions)
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
