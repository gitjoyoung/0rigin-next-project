import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/shared/shadcn/ui/breadcrumb";
import Link from "next/link";

export interface BreadcrumbSegment {
  label: string;
  href: string;
}

interface BreadcrumbNavProps {
  segments: BreadcrumbSegment[];
  children?: React.ReactNode;
}

/**
 * 순수 Breadcrumb 네비게이션 컴포넌트
 * - segments를 받아서 breadcrumb만 렌더링
 * - children으로 추가 요소(예: CopyLinkButton) 주입 가능
 */
export function BreadcrumbNav({ segments, children }: BreadcrumbNavProps) {
  if (segments.length === 0) {
    return null;
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {segments.flatMap((segment, index) => {
          const isLast = index === segments.length - 1;
          const isFirst = index === 0;

          return [
            // 첫 번째가 아니면 구분자 표시
            !isFirst && (
              <BreadcrumbSeparator
                key={`separator-${segment.label}-${index}`}
              />
            ),
            <BreadcrumbItem key={`item-${segment.label}-${index}`}>
              {isLast ? (
                <BreadcrumbPage>{segment.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href={segment.href}>{segment.label}</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>,
          ];
        })}

        {children}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
