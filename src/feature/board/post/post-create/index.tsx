"use client";

import type { Profile } from "@/entities/profile";
import { useForm } from "react-hook-form";
import type { BoardFormType } from "../../common/schema/board-schema";
import PostForm from "../post-form";
import { useCreateBoardPost } from "./hook/use-create-post";
import CategorySelect from "./ui/category-select";

export default function PostCreateWidget({
  profile,
  category,
}: {
  profile: Profile | null;
  category: string;
}) {
  const form = useForm<BoardFormType>({
    defaultValues: {
      title: "",
      content: "",
      thumbnail: "",
      password: "",
      nickname: profile?.nickname || "",
      category: category || "",
    },
  });
  const { isSubmitting, onSubmit } = useCreateBoardPost({
    category: form.watch("category") || category,
    profile,
  });

  return (
    <section className="w-full py-2 px-0.5">
      <div className="flex justify-between items-center gap-2">
        <h1 className="text-2xl px-2 font-bold">글쓰기</h1>
        <CategorySelect
          value={form.watch("category")}
          onValueChange={(value) => form.setValue("category", value)}
          defaultValue={category}
        />
      </div>

      <PostForm
        form={form}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
        profile={profile}
      />
    </section>
  );
}
