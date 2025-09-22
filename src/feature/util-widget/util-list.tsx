import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/shadcn/ui/card";
import Link from "next/link";
import { utilList } from "./constance/util-list";

export default function UtilList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {utilList.map((util) => (
        <Card
          key={util.name}
          className="h-full hover:bg-accent transition-colors"
        >
          <Link key={util.href} href={util.href} className="block">
            <CardHeader className="flex flex-row items-center gap-4">
              {util.icon}
              <CardTitle>{util.name}</CardTitle>
            </CardHeader>
          </Link>
          <CardContent>
            <p className="text-sm text-muted-foreground">{util.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
