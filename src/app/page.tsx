import { ROUTE_BOARD } from "@/constants/pathname";
import { getPostList } from "@/entities/post";
import AnimatedBanner from "@/widgets/animated-banner";
import PostList from "@/widgets/board/post/post-list";
import QuestionSearch from "@/widgets/questiton-search";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

const TitleAndMoreButton = ({
  title,
  href,
}: {
  title: string;
  href: string;
}) => (
  <div className="flex justify-between m-1">
    <h1 className="sm:text-base text-sm font-bold ">{title}</h1>
    <Link href={href} className="text-xs text-end self-end text-gray-500 ">
      더보기
    </Link>
  </div>
);

async function CurrentPostView() {
  const { items } = await getPostList({
    page: 1,
    limit: 20,
  });
  return <PostList data={items} />;
}

export default async function Home() {
  return (
    <div className="flex flex-col h-full">
      <QuestionSearch />
      <AnimatedBanner />
      <div className="flex flex-col gap-1 flex-grow ">
        <TitleAndMoreButton
          title="LATEST POSTS"
          href={`${ROUTE_BOARD}/latest`}
        />
        <Suspense fallback={<Loading />}>
          <CurrentPostView />
        </Suspense>
      </div>
    </div>
  );
}
