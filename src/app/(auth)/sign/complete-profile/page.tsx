import GoogleProfileForm from "@/widgets/signup/ui/google-profile-form";

interface PageProps {
  searchParams: {
    userId?: string;
    email?: string;
  };
}

export default async function page({ searchParams }: PageProps) {
  const params = await searchParams;
  const { userId, email } = params;

  // 필수 정보가 없으면 로그인 페이지로 리다이렉트
  if (!userId || !email) {
    return (
      <div className="flex flex-col items-center py-4 px-4">
        <div className="text-center">
          <h1 className="text-lg font-semibold mb-2">접근 오류</h1>
          <p className="text-sm text-muted-foreground mb-4">
            올바른 경로로 접근해주세요.
          </p>
          <a href="/login" className="text-blue-500 hover:underline">
            로그인 페이지로 이동
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center py-4 px-4">
      <GoogleProfileForm userId={userId} email={email} />
    </div>
  );
}
