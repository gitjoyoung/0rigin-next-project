"use client";

import { Alert, AlertDescription } from "@/shared/shadcn/ui/alert";
import { Button } from "@/shared/shadcn/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";
import { Input } from "@/shared/shadcn/ui/input";
import { Label } from "@/shared/shadcn/ui/label";
import { Progress } from "@/shared/shadcn/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/ui/select";
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile, toBlobURL } from "@ffmpeg/util";
import { Download, Loader2, Upload, Video } from "lucide-react";
import { useRef, useState } from "react";

interface VideoFile {
  file: File;
  url: string;
  size: string;
}

interface CompressedVideo {
  url: string;
  size: string;
  filename: string;
}

export default function VideoCompressor() {
  const [selectedFile, setSelectedFile] = useState<VideoFile | null>(null);
  const [compressedVideo, setCompressedVideo] =
    useState<CompressedVideo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState("medium");
  const [error, setError] = useState<string | null>(null);

  const ffmpegRef = useRef(new FFmpeg());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // 동영상 파일 확인
    if (!file.type.startsWith("video/")) {
      setError("동영상 파일만 업로드 가능합니다.");
      return;
    }

    setError(null);
    setCompressedVideo(null);

    const url = URL.createObjectURL(file);
    setSelectedFile({
      file,
      url,
      size: formatFileSize(file.size),
    });
  };

  const loadFFmpeg = async () => {
    const ffmpeg = ffmpegRef.current;
    if (!ffmpeg.loaded) {
      const baseURL = "https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd";
      await ffmpeg.load({
        coreURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.js`,
          "text/javascript",
        ),
        wasmURL: await toBlobURL(
          `${baseURL}/ffmpeg-core.wasm`,
          "application/wasm",
        ),
      });
    }
  };

  const getQualityParams = (quality: string) => {
    switch (quality) {
      case "high":
        return ["-crf", "23", "-preset", "fast"];
      case "medium":
        return ["-crf", "28", "-preset", "medium"];
      case "low":
        return ["-crf", "35", "-preset", "fast"];
      default:
        return ["-crf", "28", "-preset", "medium"];
    }
  };

  const compressVideo = async () => {
    if (!selectedFile) return;

    setIsLoading(true);
    setProgress(0);
    setError(null);

    try {
      await loadFFmpeg();
      const ffmpeg = ffmpegRef.current;

      // 진행률 모니터링
      ffmpeg.on("progress", ({ progress }) => {
        setProgress(Math.round(progress * 100));
      });

      // 파일을 FFmpeg 파일시스템에 쓰기
      const inputFileName = "input.mp4";
      const outputFileName = "output.mp4";

      await ffmpeg.writeFile(inputFileName, await fetchFile(selectedFile.file));

      // 압축 실행
      const qualityParams = getQualityParams(quality);
      await ffmpeg.exec([
        "-i",
        inputFileName,
        ...qualityParams,
        "-movflags",
        "+faststart",
        outputFileName,
      ]);

      // 압축된 파일 읽기
      const fileData = await ffmpeg.readFile(outputFileName);
      const blob = new Blob([fileData], { type: "video/mp4" });
      const url = URL.createObjectURL(blob);

      setCompressedVideo({
        url,
        size: formatFileSize(blob.size),
        filename: `compressed_${selectedFile.file.name.replace(/\.[^/.]+$/, "")}.mp4`,
      });

      // 임시 파일 정리
      await ffmpeg.deleteFile(inputFileName);
      await ffmpeg.deleteFile(outputFileName);
    } catch (err) {
      console.error("압축 중 오류:", err);
      setError("동영상 압축 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
      setProgress(0);
    }
  };

  const downloadVideo = () => {
    if (!compressedVideo) return;

    const link = document.createElement("a");
    link.href = compressedVideo.url;
    link.download = compressedVideo.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reset = () => {
    setSelectedFile(null);
    setCompressedVideo(null);
    setProgress(0);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Video className="w-5 h-5" />
          동영상 압축기
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* 파일 업로드 */}
        <div className="space-y-2">
          <Label htmlFor="video-upload">동영상 파일 선택</Label>
          <div className="flex items-center gap-4">
            <Input
              id="video-upload"
              type="file"
              accept="video/*"
              onChange={handleFileSelect}
              ref={fileInputRef}
              className="flex-1"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
            >
              <Upload className="w-4 h-4 mr-2" />
              파일 선택
            </Button>
          </div>
        </div>

        {/* 압축 품질 설정 */}
        <div className="space-y-2">
          <Label>압축 품질</Label>
          <Select value={quality} onValueChange={setQuality}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">고품질 (용량 큼)</SelectItem>
              <SelectItem value="medium">중품질 (권장)</SelectItem>
              <SelectItem value="low">저품질 (용량 작음)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 에러 메시지 */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* 선택된 파일 정보 */}
        {selectedFile && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">선택된 파일:</span>
                  <span className="text-sm text-muted-foreground">
                    {selectedFile.file.name} ({selectedFile.size})
                  </span>
                </div>
                <video
                  src={selectedFile.url}
                  controls
                  className="w-full max-h-64 rounded-md"
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* 압축 버튼 및 진행률 */}
        {selectedFile && (
          <div className="space-y-4">
            <Button
              onClick={compressVideo}
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  압축 중...
                </>
              ) : (
                "동영상 압축하기"
              )}
            </Button>

            {isLoading && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>압축 진행률</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}
          </div>
        )}

        {/* 압축 결과 */}
        {compressedVideo && (
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">압축 완료:</span>
                  <span className="text-sm text-muted-foreground">
                    {compressedVideo.size}
                  </span>
                </div>
                <video
                  src={compressedVideo.url}
                  controls
                  className="w-full max-h-64 rounded-md"
                />
                <div className="flex gap-2">
                  <Button onClick={downloadVideo} className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    다운로드
                  </Button>
                  <Button onClick={reset} variant="outline">
                    새로 시작
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
