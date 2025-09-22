import { FileTextIcon, ImageIcon, VideoIcon } from "lucide-react";

export const utilList = [
  {
    id: "image-converter",
    name: "이미지 압축 도구",
    href: "/utils/image-converter",
    description:
      "이미지 포멧과 압축을 지원합니다. jpg, png, webp 등 다양한 포멧을 지원합니다. 최대 10MB까지 업로드 가능합니다.",
    icon: <ImageIcon className="h-6 w-6" />,
  },
  {
    id: "video-compressor",
    name: "동영상 압축 도구",
    href: "/utils/video-compress",
    description:
      "동영상 파일의 용량을 줄여 압축할 수 있습니다. 브라우저에서 안전하게 처리되며 고품질, 중품질, 저품질 옵션을 제공합니다.",
    icon: <VideoIcon className="h-6 w-6" />,
  },
  {
    id: "memo",
    name: "메모",
    href: "/utils/memo",
    description: "메모를 작성할 수 있습니다.",
    icon: <FileTextIcon className="h-6 w-6" />,
  },
];
