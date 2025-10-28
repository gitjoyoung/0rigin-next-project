"use client";

interface AccountInfoProps {
  profile?: any;
  className?: string;
}

export default function AccountInfo({ profile, className }: AccountInfoProps) {
  const { nickname, email } = profile || {};
  return (
    <div
      className={`bg-gray-50 dark:bg-gray-800 rounded-lg p-4 flex-shrink-0 w-full md:w-80 ${className}`}
    >
      <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        계정 정보
      </h2>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">닉네임</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {nickname || "미설정"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">이메일</span>
          <span className="font-medium text-gray-900 dark:text-white">
            {email || "미설정"}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">인증 상태</span>
          <span
            className={`font-medium ${
              email
                ? "text-green-600 dark:text-green-400"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {email ? "인증됨" : "미인증"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-300">포인트</span>
          <span>{email ? "0" : "미인증"}</span>
        </div>
      </div>
    </div>
  );
}
