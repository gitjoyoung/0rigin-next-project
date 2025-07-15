import { FileTextIcon, ImageIcon } from 'lucide-react'

export const utilList = [
   {
      id: 'image-converter',
      name: '이미지 압축 도구',
      href: '/utils/image-converter',
      description:
         '이미지 포멧과 압축을 지원합니다. jpg, png, webp 등 다양한 포멧을 지원합니다. 최대 10MB까지 업로드 가능합니다.',
      icon: <ImageIcon className="h-6 w-6" />,
   },
   {
      id: 'memo',
      name: '메모',
      href: '/utils/memo',
      description: '메모를 작성할 수 있습니다.',
      icon: <FileTextIcon className="h-6 w-6" />,
   },
]
