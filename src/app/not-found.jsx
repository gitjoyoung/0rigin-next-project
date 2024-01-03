import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] w-[70vw]">
      <h1 className="xl:text-4xl lg:text-4xl md:text-3xl font-bold mb-4">
        404 - 페이지가 없습니다...
      </h1>
      <p className="text-gray-600 mb-8">
        죄송합니다. 찾고 계신 페이지가 존재하지 않습니다.
      </p>
      <Link
        href={"/"}
        className="bg-cyan-500 text-white px-4 py-2 rounded-md hover:bg-cyan-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        홈으로 돌아가기
      </Link>
    </div>
  );
}
