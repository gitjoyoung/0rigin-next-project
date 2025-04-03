interface Props {
   commentCount: number
}

export default function CommentHeader({ commentCount }: Props) {
   return (
      <div className="flex items-center justify-between border-b py-2">
         <h3 className="text-lg font-semibold">댓글 {commentCount}개</h3>
      </div>
   )
}
