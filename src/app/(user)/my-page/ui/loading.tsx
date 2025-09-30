import { LoadingSpinner } from "@/shared/ui/loading-spinner";

export default function loading() {
  return (
    <section className="flex justify-center items-center w-full h-[300px]">
      <LoadingSpinner text="프로필 로딩 중 입니다" />
    </section>
  );
}
