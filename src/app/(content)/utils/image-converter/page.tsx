import ImageConverterWidget from "@/feature/util-widget/image-converter";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "이미지 압축 도구",
  description:
    "0RIGIN(제로리진) 이미지 형식을 변환하고 압축할 수 있는 도구입니다.",
};

export default function Page() {
  return <ImageConverterWidget />;
}
