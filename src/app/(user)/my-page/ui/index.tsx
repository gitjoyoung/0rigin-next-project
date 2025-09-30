"use client";

import { Button } from "@/shared/shadcn/ui/button";
import { useEffect, useState } from "react";
import { useProfile } from "./setting/hooks/use-profile";

import LikePosts from "./contents/like-posts";
import MyComments from "./contents/my-comments";
import MyPosts from "./contents/my-posts";
import AccountInfo from "./history/account-info";
import ActivityGrid from "./history/activity-grid";
import MenuList from "./menu/menu-list";
import SettingsPage from "./setting/setting";

type MenuItem = "posts" | "comments" | "likes" | "settings";

const menuItems = [
  {
    id: "posts" as MenuItem,
    component: MyPosts,
  },
  {
    id: "comments" as MenuItem,
    component: MyComments,
  },
  {
    id: "likes" as MenuItem,
    component: LikePosts,
  },
  {
    id: "settings" as MenuItem,
    component: SettingsPage,
  },
];

export default function MyPage() {
  const { profile } = useProfile();
  const [selectedMenu, setSelectedMenu] = useState<MenuItem | null>(null);

  // URL 해시를 통한 상태 관리
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as MenuItem;
      if (hash && menuItems.some((item) => item.id === hash)) {
        setSelectedMenu(hash);
      } else {
        setSelectedMenu(null);
      }
    };
    // 초기 로드시 해시 확인
    handleHashChange();
    // 해시 변경 감지
    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const handleMenuClick = (menuId: MenuItem) => {
    window.location.hash = menuId;
  };

  const handleBackToMain = () => {
    window.location.hash = "";
  };

  // 특정 메뉴가 선택된 경우 해당 컴포넌트 렌더링
  if (selectedMenu) {
    const selectedItem = menuItems.find((item) => item.id === selectedMenu);
    if (selectedItem) {
      const Component = selectedItem.component;
      return (
        <div className="w-full mx-auto p-6">
          <div className="mb-6">
            <Button onClick={handleBackToMain} variant="ghost" className="mb-4">
              ← 마이페이지로 돌아가기
            </Button>
          </div>
          <Component />
        </div>
      );
    }
  }

  // 메인 마이페이지
  return (
    <div className="w-full mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        마이페이지
      </h1>

      {/* 계정 정보와 활동 기록 수평 배치 */}
      <div className="flex flex-wrap gap-6">
        <AccountInfo profile={profile} />
        <ActivityGrid className="flex-1 min-w-0" />
      </div>

      {/* 메뉴 리스트 */}
      <MenuList onMenuClick={handleMenuClick} />
    </div>
  );
}
