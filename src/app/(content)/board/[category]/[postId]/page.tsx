import { ROUTE_BOARD } from "@/constants/pathname";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import { getCategoryBySlug } from "@/entities/category";
import { getPostById, getPostList } from "@/entities/post";
import { getPostLikeCount } from "@/entities/post-like";
import Comment from "@/feature/board/comment";
import BoardFooter from "@/feature/board/footer/board-footer";
import BoardHeader from "@/feature/board/header/board-header";
import PostLike from "@/feature/board/post/post-like";
import PostList from "@/feature/board/post/post-list";
import PostView from "@/feature/board/post/post-view";
import { BreadcrumbNav, CopyLinkButton } from "@/feature/bread-crumb";
import { cache } from "react";

interface IParams {
  params: {
    category: string;
    postId: string;
  };
  searchParams: { page: string };
}

const getCachedPostById = cache(async (postId: number) => {
  return await getPostById(postId);
});

export async function generateMetadata({ params }: IParams): Promise<Metadata> {
  const { category, postId } = await params;
  const postData = await getCachedPostById(Number(postId));
  const metaData = {
    title: `${(postData && postData.title) || category} - 0RIGIN(제로리진)`,
    description: `${(postData && postData.summary) || category} - 0RIGIN(제로리진)`,
  };
  return metaData;
}

export default async function Page({ params }: IParams) {
  const { category, postId } = await params;
  if (!category || !postId || isNaN(Number(postId))) redirect(ROUTE_BOARD);
  const [categoryInfo] = await Promise.all([getCategoryBySlug(category)]);
  if (!categoryInfo) redirect(ROUTE_BOARD);
  const { items } = await getPostList({
    category: category,
    page: 1,
    limit: 30,
  });
  const postData = await getCachedPostById(Number(postId));
  if (!postData) notFound();
  const count = await getPostLikeCount(Number(postId));

  // Breadcrumb segments 구성 (Board부터 전체 경로)
  const breadcrumbSegments = [
    {
      label: "Board",
      href: "/board",
    },
    {
      label: category.toLowerCase(),
      href: `/board/${category}`,
    },
    {
      label: postId.toString(),
      href: `/board/${category}/${postId}`,
    },
  ];

  // 공유 URL 생성 (서버에서 실행 - 빌드타임 최적화)
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const shareUrl = `${baseUrl}/board/${category}/${postId}`;

  return (
    <section className="flex flex-col gap-4 my-2 px-2">
      <div className="flex flex-col gap-2">
        {/* 서버에서 조합: BreadcrumbNav(서버) + CopyLinkButton(클라이언트) */}
        <BreadcrumbNav segments={breadcrumbSegments}>
          <CopyLinkButton url={shareUrl} />
        </BreadcrumbNav>
        <PostView postData={postData} likeCount={count.length} />
      </div>
      <PostLike postId={postId} />
      <Comment postId={postId} />
      <div className="flex flex-col gap-2">
        <BoardHeader category={categoryInfo} />
        <PostList data={items} category={category} />
      </div>
      <BoardFooter category={categoryInfo} />
    </section>
  );
}
