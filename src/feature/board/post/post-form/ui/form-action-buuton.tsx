import { Button } from "@/shared/shadcn/ui/button";

export default function FormActionBuuton({
  isSubmitting,
}: {
  isSubmitting: boolean;
}) {
  return (
    <div className="flex gap-6 justify-end my-2 items-center">
      <Button
        type="button"
        size="lg"
        className="bg-gray-400 hover:bg-gray-500"
        onClick={() => window.history.back()}
        disabled={isSubmitting}
      >
        취소
      </Button>
      <Button size="lg" type="submit" disabled={isSubmitting}>
        제출 하기
      </Button>
    </div>
  );
}
