import { compressImage, type CompressImageOptions } from './compress-image'

// Mock browser-image-compression
jest.mock('browser-image-compression', () => ({
   __esModule: true,
   default: jest.fn(),
}))

import imageCompression from 'browser-image-compression'

describe('compressImage', () => {
   // Mock File 객체 생성 헬퍼 함수
   const createMockFile = (name: string, type: string, size: number): File => {
      const file = new File(['mock content'], name, { type })
      Object.defineProperty(file, 'size', { value: size })
      return file
   }

   beforeEach(() => {
      jest.clearAllMocks()
   })

   describe('파일 타입 검증', () => {
      it('허용된 이미지 타입은 성공해야 함', async () => {
         const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
         const mockCompressedFile = createMockFile(
            'compressed.jpg',
            'image/jpeg',
            50000,
         )

         ;(imageCompression as unknown as jest.Mock).mockResolvedValue(
            mockCompressedFile,
         )

         const result = await compressImage(mockFile)

         expect(result.status).toBe('success')
         expect(result.file).toBe(mockCompressedFile)
         expect(imageCompression).toHaveBeenCalledWith(
            mockFile,
            expect.any(Object),
         )
      })

      it('허용되지 않은 파일 타입은 에러를 반환해야 함', async () => {
         const mockFile = createMockFile('test.txt', 'text/plain', 1024)

         const result = await compressImage(mockFile)

         expect(result.status).toBe('error')
         expect(result.errorMessage).toBe(
            '허용되지 않은 파일 형식입니다. 이미지 파일만 업로드 가능합니다.',
         )
         expect(imageCompression).not.toHaveBeenCalled()
      })

      it('모든 허용된 이미지 타입을 테스트해야 함', async () => {
         const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/gif',
            'image/jpg',
         ]

         for (const type of allowedTypes) {
            const mockFile = createMockFile(
               `test.${type.split('/')[1]}`,
               type,
               1024 * 1024,
            )
            const mockCompressedFile = createMockFile(
               'compressed.jpg',
               type,
               50000,
            )

            ;(imageCompression as unknown as jest.Mock).mockResolvedValue(
               mockCompressedFile,
            )

            const result = await compressImage(mockFile)

            expect(result.status).toBe('success')
            expect(imageCompression).toHaveBeenCalledWith(
               mockFile,
               expect.any(Object),
            )
         }
      })
   })

   describe('압축 옵션', () => {
      it('기본 옵션으로 압축해야 함', async () => {
         const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
         const mockCompressedFile = createMockFile(
            'compressed.jpg',
            'image/jpeg',
            50000,
         )

         ;(imageCompression as unknown as jest.Mock).mockResolvedValue(
            mockCompressedFile,
         )

         await compressImage(mockFile)

         expect(imageCompression).toHaveBeenCalledWith(mockFile, {
            maxSizeMB: 0.1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/jpeg',
         })
      })

      it('사용자 정의 옵션으로 압축해야 함', async () => {
         const mockFile = createMockFile('test.png', 'image/png', 1024 * 1024)
         const mockCompressedFile = createMockFile(
            'compressed.png',
            'image/png',
            50000,
         )

         ;(imageCompression as unknown as jest.Mock).mockResolvedValue(
            mockCompressedFile,
         )

         const customOptions: CompressImageOptions = {
            maxSizeMB: 0.5,
            maxWidthOrHeight: 1024,
            useWebWorker: false,
            fileType: 'image/webp',
         }

         await compressImage(mockFile, customOptions)

         expect(imageCompression).toHaveBeenCalledWith(mockFile, customOptions)
      })

      it('부분 옵션만 전달해도 기본값과 병합되어야 함', async () => {
         const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
         const mockCompressedFile = createMockFile(
            'compressed.jpg',
            'image/jpeg',
            50000,
         )

         ;(imageCompression as unknown as jest.Mock).mockResolvedValue(
            mockCompressedFile,
         )

         const partialOptions: CompressImageOptions = {
            maxSizeMB: 0.2,
            fileType: 'image/webp',
         }

         await compressImage(mockFile, partialOptions)

         expect(imageCompression).toHaveBeenCalledWith(mockFile, {
            maxSizeMB: 0.2,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            fileType: 'image/webp',
         })
      })
   })

   describe('에러 처리', () => {
      it('imageCompression에서 에러가 발생하면 에러 상태를 반환해야 함', async () => {
         const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
         const errorMessage = '압축 중 오류가 발생했습니다'

         ;(imageCompression as unknown as jest.Mock).mockRejectedValue(
            new Error(errorMessage),
         )

         const result = await compressImage(mockFile)

         expect(result.status).toBe('error')
         expect(result.errorMessage).toBe(errorMessage)
         expect(result.file).toBe(mockFile)
      })

      it('알 수 없는 에러 타입도 처리해야 함', async () => {
         const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)

         ;(imageCompression as unknown as jest.Mock).mockRejectedValue(
            '알 수 없는 에러',
         )

         const result = await compressImage(mockFile)

         expect(result.status).toBe('error')
         expect(result.errorMessage).toBe('알 수 없는 오류가 발생했습니다')
         expect(result.file).toBe(mockFile)
      })
   })

   describe('성공 케이스', () => {
      it('압축이 성공하면 올바른 결과를 반환해야 함', async () => {
         const mockFile = createMockFile('test.jpg', 'image/jpeg', 1024 * 1024)
         const mockCompressedFile = createMockFile(
            'compressed.jpg',
            'image/jpeg',
            50000,
         )

         ;(imageCompression as unknown as jest.Mock).mockResolvedValue(
            mockCompressedFile,
         )

         const result = await compressImage(mockFile)

         expect(result.status).toBe('success')
         expect(result.file).toBe(mockCompressedFile)
         expect(result.errorMessage).toBeUndefined()
      })
   })
})
