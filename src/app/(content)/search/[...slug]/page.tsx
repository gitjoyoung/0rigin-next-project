import { searchQuizzes } from "@/entities/quiz";
import { SupabaseServerClient } from "@/shared/lib/supabase/supabase-server-client";
import { Metadata } from "next";
import SearchBoard from "./ui";
import SearchPagination from "./ui/search-pagination";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const keyword = decodeURIComponent(slug[0] || "");
  return {
    title: `검색 결과 - ${keyword} - 0RIGIN(제로리진)`,
    description: `검색 결과 - ${keyword} - 0RIGIN(제로리진)`,
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const keyword = decodeURIComponent(slug[0] || "");
  const activePage = parseInt(slug[1] || "1");
  const offset = (activePage - 1) * 5;

  const supabase = await SupabaseServerClient();

  // 병렬로 게시글과 퀴즈 검색 실행
  const [postSearchPromise, quizSearchPromise] = await Promise.all([
    Promise.all([
      supabase
        .from("posts")
        .select("*", { count: "exact", head: true })
        .ilike("title", `%${keyword}%`),
      supabase
        .from("posts")
        .select("*")
        .ilike("title", `%${keyword}%`)
        .order("created_at", { ascending: false })
        .range(offset, offset + 4)
        .limit(5),
    ]),
    searchQuizzes(keyword, 5, offset),
  ]);

  const [{ count: postCount }, { data: postSearchResult }] = postSearchPromise;
  const { data: quizSearchResult, count: quizCount } = quizSearchPromise;

  const totalCount = (postCount || 0) + (quizCount || 0);

  return (
    <div className="my-2 space-y-3">
      <SearchBoard
        postSearchResult={postSearchResult ?? []}
        quizSearchResult={quizSearchResult ?? []}
        keyword={keyword}
        postCount={postCount ?? 0}
        quizCount={quizCount}
        totalCount={totalCount}
      />
      <div className="flex items-center my-12">
        <SearchPagination
          totalItemCount={totalCount}
          activePage={activePage}
          paginationBaseUrl={`/search/${keyword}`}
        />
      </div>
    </div>
  );
}
