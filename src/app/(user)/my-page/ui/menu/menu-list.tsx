"use client";

import { Button } from "@/shared/shadcn/ui/button";
import { FileText, Heart, MessageSquare, Settings } from "lucide-react";

type MenuItem = "posts" | "comments" | "likes" | "settings";

interface MenuListProps {
  onMenuClick: (menuId: MenuItem) => void;
  className?: string;
}

export default function MenuList({ onMenuClick, className }: MenuListProps) {
  const menuItems = [
    {
      id: "posts" as MenuItem,
      title: "내가 작성한 글",
      description: "작성한 게시글을 확인하고 관리합니다",
      icon: FileText,
    },
    {
      id: "comments" as MenuItem,
      title: "내가 작성한 댓글",
      description: "작성한 댓글을 확인하고 관리합니다",
      icon: MessageSquare,
    },
    {
      id: "likes" as MenuItem,
      title: "좋아요한 글",
      description: "좋아요한 게시글을 확인합니다",
      icon: Heart,
    },
    {
      id: "settings" as MenuItem,
      title: "설정",
      description: "계정 설정 및 비밀번호를 변경합니다",
      icon: Settings,
    },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      {menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer"
            onClick={() => onMenuClick(item.id)}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 dark:text-gray-500"
            >
              →
            </Button>
          </div>
        );
      })}
    </div>
  );
}
