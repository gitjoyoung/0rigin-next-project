import Custom404 from "@/app/not-found";
import BoardContent from "@/components/Board/BoradList";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Pagination } from '@/components/Board/Pagination';

export default function Page({ params }) {
  const pageIndex = parseInt(params.pageIndex, 10);
  console.log(typeof pageIndex);
  if (typeof pageIndex != "number") {
    console.log("not a number");
    return <Custom404 />;
  }
  const options = {
    url: `${process.env.NEXT_PUBLIC_API_URL}borad}`,
    method: "get",
  };
  // useEffect(() => {
  //   const fetchBoardData = async () => {
  //     await axios(options);
  //   };
  // }, []);

  return (
    <div className='p-1'>
      <div className='flex justify-between mt-2 mb-2'>
      <p>{pageIndex} 페이지</p>
        {/* <button onClick={() => router.push("/board")}>목록</button>
        <button onClick={() => router.push("/board/create")}> 글쓰기</button> */}
      </div>

      {/* {fetchBoardData.map((item) => (
        <BoardContent key={item.no} {...item} />
      ))} */}

      {/* <Pagination  /> */}
    </div>
  );
}
