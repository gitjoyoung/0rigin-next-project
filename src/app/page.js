import Image from "next/image";
import CreatePage from "./create/page";
import Header from "@/components/Header/Header";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import Link from "next/link";
import { Control } from "./Control";

export default async function Home() {
  const resp = await fetch(process.env.NEXT_PUBLIC_API_URL + "topics", {
    cache: "no-store",
  });
  const topics = await resp.json();

  return (
    <>
      <ol>
        {topics.map((topic) => {
          return (
            <li key={topic.id}>
              <Link href={`/read/${topic.id}`}>{topic.title}</Link>
            </li>
          );
        })}
      </ol>
      <Control />
    </>
  );
}
