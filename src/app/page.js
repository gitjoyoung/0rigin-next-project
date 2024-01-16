import Contact from "@/components/Contact/Contact";
import Link from "next/link";
import { Control } from "./Control";
import Banner from "@/components/Banner/Banner";

export default async function Home() {
  // const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
  //   cache: "no-store",
  // });
  // const topics = await resp.json();

  return (
    <article className="">
      <div className="flex flex-wrap gap-4 w-full ">

        <div className="bg-white  w-full h-[300px] border border-emerald-300 text-center">
          <Banner />
        </div>

        <div className="bg-white p-4 border border-emerald-300 text-center">
          2
        </div>

        <div className="bg-white p-4 border border-emerald-300 text-center">
          3
        </div>

        <div className="bg-white p-4 border border-emerald-300 text-center">
          4
        </div>
        <div className="bg-white p-4 border border-emerald-300 text-center">
          4
        </div>

        <div className="bg-white p-4 border border-emerald-300 text-center">
          4
        </div>
        <div className="bg-white p-4 border border-emerald-300 text-center">
          4
        </div>
        <div className="bg-white p-4 border border-emerald-300 text-center">
          4
        </div>
      </div>
      {/* <ol className="w-90">
        {topics.map((topic) => {
          return (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          );
        })}
      </ol>
      <Control /> */}
    </article>
  );
}
