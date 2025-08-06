import { Loader2, Search } from "lucide-react";

export default function SearchLoading() {
  return (
    <div className="my-2 space-y-3">
      {/* 검색 결과 헤더 */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Search className="h-5 w-5 text-gray-500" />
          <span className="text-lg font-semibold">검색 결과</span>
        </div>

        {/* 검색 중 표시 */}
        <div className="flex items-center justify-center py-12">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <div className="text-center space-y-2">
              <p className="text-lg font-medium text-gray-700">
                검색 중입니다...
              </p>
              <p className="text-sm text-gray-500">검색 결과를 찾고 있습니다</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
