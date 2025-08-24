interface PageProps {
  searchParams: {
    code?: string;
    userId?: string;
    email?: string;
    profileId?: string;
    signupComplete?: string;
    status?: string;
    error?: string;
    sessionCleared?: string;
  };
}

export default function TestPageB({ searchParams }: PageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-red-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-red-600">
          ❌ 테스트 페이지 B
        </h1>
        <p className="text-gray-700 mb-6">
          프로필 조회 실패 또는 프로필이 완성되지 않았습니다.
        </p>

        <div className="mb-6 rounded bg-red-100 p-3 text-sm text-red-800">
          ⚠️ 프로필 상태: signup_complete = false 또는 조회 실패
          {searchParams.sessionCleared && (
            <div className="mt-2 text-xs text-red-700">
              🔒 보안을 위해 세션이 정리되었습니다.
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            전달된 파라미터:
          </h2>
          <div className="grid gap-3">
            <div className="flex justify-between rounded bg-gray-50 p-3">
              <span className="font-medium">OAuth Code:</span>
              <span className="break-all text-sm">
                {searchParams.code || "N/A"}
              </span>
            </div>
            <div className="flex justify-between rounded bg-gray-50 p-3">
              <span className="font-medium">User ID:</span>
              <span className="break-all text-sm">
                {searchParams.userId || "N/A"}
              </span>
            </div>
            <div className="flex justify-between rounded bg-gray-50 p-3">
              <span className="font-medium">Email:</span>
              <span className="break-all text-sm">
                {searchParams.email || "N/A"}
              </span>
            </div>
            <div className="flex justify-between rounded bg-gray-50 p-3">
              <span className="font-medium">Profile ID:</span>
              <span className="break-all text-sm">
                {searchParams.profileId || "N/A"}
              </span>
            </div>
            <div className="flex justify-between rounded bg-gray-50 p-3">
              <span className="font-medium">Signup Complete:</span>
              <span className="break-all text-sm">
                {searchParams.signupComplete || "N/A"}
              </span>
            </div>
            <div className="flex justify-between rounded bg-gray-50 p-3">
              <span className="font-medium">Status:</span>
              <span className="break-all text-sm font-medium text-red-600">
                {searchParams.status || "N/A"}
              </span>
            </div>
            {searchParams.error && (
              <div className="flex justify-between rounded bg-red-50 p-3 border border-red-200">
                <span className="font-medium text-red-700">Error:</span>
                <span className="break-all text-sm text-red-600">
                  {searchParams.error}
                </span>
              </div>
            )}
            {searchParams.sessionCleared && (
              <div className="flex justify-between rounded bg-blue-50 p-3 border border-blue-200">
                <span className="font-medium text-blue-700">
                  Session Status:
                </span>
                <span className="break-all text-sm text-blue-600">
                  Cleared for security
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
