interface Props {
   postId: string
}

export default function CommentForm({ postId }: Props) {
   return (
      <form className="mt-4">
         <textarea
            className="w-full p-2 border rounded"
            placeholder="댓글을 작성하세요"
            rows={3}
         />
         <div className="flex justify-end mt-2">
            <button
               type="submit"
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
               작성하기
            </button>
         </div>
      </form>
   )
}
