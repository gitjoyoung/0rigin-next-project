interface PageProps {
  searchParams: {
    code?: string;
    userId?: string;
    email?: string;
    profileId?: string;
    signupComplete?: string;
    status?: string;
  };
}

export default function TestPageA({ searchParams }: PageProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-green-50 p-4">
      <div className="w-full max-w-2xl rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-4 text-2xl font-bold text-green-600">
          🎉 테스트 페이지 A
        </h1>
        <p className="text-gray-700 mb-6">
          프로필 조회 성공! 로그인이 완료되었습니다.
        </p>

        <div className="mb-6 rounded bg-green-100 p-3 text-sm text-green-800">
          ✅ 프로필 상태: signup_complete = true
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
              <span className="break-all text-sm font-medium text-green-600">
                {searchParams.status || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
