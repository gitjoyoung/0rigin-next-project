import { generateMetadata } from "@/shared/metadata";
import VideoCompressor from "@/widgets/util-widget/video-compressor";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  title: "동영상 압축",
  description: "동영상 파일의 용량을 줄여 압축하는 유틸리티",
  keywords: ["동영상", "압축", "용량", "변환", "FFmpeg"],
});

export default function VideoCompressPage() {
  return (
    <div className="container max-w-4xl mx-auto py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">동영상 압축</h1>
          <p className="text-muted-foreground">
            동영상 파일의 용량을 줄여보세요. 브라우저에서 안전하게 처리됩니다.
          </p>
        </div>
        <VideoCompressor />
      </div>
    </div>
  );
}
