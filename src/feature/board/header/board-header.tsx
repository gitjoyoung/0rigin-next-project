import { ROUTE_BOARD } from "@/constants/pathname";
import type { Category } from "@/entities/category";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";

// 헤더에서 필요한 최소한의 카테고리 정보

interface Props {
  category: Partial<Category> | null;
}

export default function BoardHeader({ category }: Props) {
  if (!category) {
    return null;
  }
  const { slug, name, description } = category;

  const listHref = `${ROUTE_BOARD}/${slug}`;
  const createHref = `${ROUTE_BOARD}/${slug}/create`;

  return (
    <article className="my-2 px-1 flex justify-between items-center ">
      <div className="space-y-1">
        <Link href={listHref}>
          <h1 className="text-2xl font-bold tracking-tight hover:text-slate-700 transition-colors">
            {name}
          </h1>
        </Link>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {category.can_write && (
        <Link href={createHref}>
          <Button variant="default" className="p-4" size="default">
            글쓰기
          </Button>
        </Link>
      )}
    </article>
  );
}
