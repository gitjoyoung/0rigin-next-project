const MAX_FILE_SIZE_MB = 10
const IMAGE_PICKER_CONFIG = {
   IMAGES_TYPES: ['image/png', 'image/jpeg', 'image/jpg'],
   MAX_FILE_SIZE: MAX_FILE_SIZE_MB * 1024 * 1024, // 20MB
   MAX_FILE_SIZE_MB,
   MAX_FILE_COUNT: 10, // 최대 10개의 이미지
}

export default IMAGE_PICKER_CONFIG
