import { ROUTE_BOARD } from "@/constants/pathname";
import type { Category } from "@/entities/category";
import { Button } from "@/shared/shadcn/ui/button";
import Link from "next/link";

const FOOTER_DATA = {
  list: "목록",
  create: "글쓰기",
};

export default function BoardFooter({ category }: { category: Category }) {
  if (!category) {
    return null;
  }
  const { slug } = category;
  const listHref = `${ROUTE_BOARD}/${slug}`;
  const createHref = `${ROUTE_BOARD}/${slug}/create`;

  return (
    <div className="flex justify-between items-center ">
      <Link href={listHref}>
        <Button
          variant="secondary"
          className="p-4 flex items-center"
          size="default"
        >
          {FOOTER_DATA.list}
        </Button>
      </Link>
      {category.can_write && (
        <Link href={createHref}>
          <Button
            variant="default"
            className="p-4 flex items-center"
            size="default"
          >
            {FOOTER_DATA.create}
          </Button>
        </Link>
      )}
    </div>
  );
}
