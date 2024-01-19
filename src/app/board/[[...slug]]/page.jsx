import BoardContent from '@/components/Board/BoardContent';

export default function Page({ params }) {
   const slug = params?.slug?.[0];
   const postId = /^\d+$/.test(slug) ? parseInt(slug, 10) : 1;
   const res = getBoardData(postId);
   console.log(res);
   return (
      <div className='p-1'>
         <BoardContent postId={postId} />
      </div>
   );
}

const getBoardData = async (postId) => {
   const url = `${process.env.NEXT_PUBLIC_API_URL}board?postId=${postId}&_limit=10`;

   try {
      const response = await fetch(url);

      if (!response.ok) {
         throw new Error('Failed to fetch board data');
      }

      return await response.json();
   } catch (error) {
      throw error;
   }
};
