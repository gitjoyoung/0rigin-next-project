import type { Database } from "@/shared/types";
import MarkDownViewer from "./mark-down-viewer";
import PostHeader from "./post-header";

interface Props {
  postData: Database["public"]["Tables"]["posts"]["Row"];
  likeCount: number;
}

export default function PostView({ postData, likeCount }: Props) {
  return (
    <section className="flex flex-col gap-3 ">
      <PostHeader {...postData} likeCount={likeCount} />
      <MarkDownViewer content={postData.content as string} />
    </section>
  );
}
