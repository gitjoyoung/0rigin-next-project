import { getWritableCategories } from "@/shared/constants/categories";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/shadcn/ui/select";

interface Props {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

export default function CategorySelect({
  value,
  onValueChange,
  defaultValue,
}: Props) {
  const writableCategories = getWritableCategories();

  return (
    <Select
      value={value}
      onValueChange={onValueChange}
      defaultValue={defaultValue}
    >
      <SelectTrigger className="w-[150px] border-none shadow-none focus:ring-0">
        <SelectValue placeholder="카테고리 선택" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-xs">게시판 카테고리</SelectLabel>
          {writableCategories.map((category) => (
            <SelectItem key={category.id} value={category.slug}>
              <div className="flex items-center gap-2">
                <category.icon className="w-4 h-4" />
                {category.title}
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
