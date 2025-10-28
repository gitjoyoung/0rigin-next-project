import type { Metadata } from "next";
import ProfilePage from "./ui";

interface PageProps {
  params: {
    userId: string;
  };
}

export const metadata: Metadata = {
  title: "프로필",
  description: "0RIGIN(제로리진) 사용자 프로필",
};

export default async function Page({ params }: PageProps) {
  const { userId } = params;

  return <ProfilePage userId={userId} />;
}
