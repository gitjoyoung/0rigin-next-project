import { ROUTE_BOARD } from "@/constants/pathname";
import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";

import Loading from "@/app/loading";
import { getCategoryBySlug } from "@/entities/category";
import { getPostById, getPostList } from "@/entities/post";
import Comment from "@/widgets/board/comment";
import BoardFooter from "@/widgets/board/footer/board-footer";
import BoardHeader from "@/widgets/board/header/board-header";
import PostLike from "@/widgets/board/post/post-like";
import PostList from "@/widgets/board/post/post-list";
import PostView from "@/widgets/board/post/post-view";
import BreadcrumbWidget from "@/widgets/bread-crumb";
import { cache, Suspense } from "react";

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
  // 타이틀  - 0RIGIN(제로리진)
  // 디스크립션 - 0RIGIN(제로리진)
  return metaData;
}

const PostViewWrapper = async ({ postId }: { postId: string }) => {
  const postData = await getCachedPostById(Number(postId));
  if (!postData) notFound();
  return <PostView postData={postData} />;
};
const PostListWrapper = async ({ category }: { category: string }) => {
  const { items } = await getPostList({
    category: category,
    page: 1,
    limit: 30,
  });
  return <PostList data={items} category={category} />;
};

export default async function Page({ params }: IParams) {
  const { category, postId } = await params;
  if (!category || !postId || isNaN(Number(postId))) redirect(ROUTE_BOARD);

  const [categoryInfo] = await Promise.all([getCategoryBySlug(category)]);

  if (!categoryInfo) redirect(ROUTE_BOARD);

  return (
    <section className="flex flex-col gap-4 my-2 px-2">
      <BreadcrumbWidget />
      <Suspense fallback={<Loading />}>
        <PostViewWrapper postId={postId} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <PostLike postId={postId} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Comment postId={postId} />
      </Suspense>
      <div className="flex flex-col gap-2">
        <BoardHeader category={categoryInfo} />
        <Suspense fallback={<Loading />}>
          <PostListWrapper category={category} />
        </Suspense>
      </div>
      <BoardFooter category={categoryInfo} />
    </section>
  );
}
