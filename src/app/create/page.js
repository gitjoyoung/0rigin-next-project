"use client";

import { useRouter } from "next/navigation";

const Create = () => {
  const router = useRouter();
  return (
    <form
      onSubmit={(e) => {
        console.log(process.env.NEXT_PUBLIC_API_URL);
        e.preventDefault();
        const title = e.target.title.value;
        const body = e.target.body.value;
        const obtions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, body }),
        };
        fetch(process.env.NEXT_PUBLIC_API_URL + `topics/`, obtions)
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            const lastId = result.id;

            router.push(`/read/${lastId}`);
            router.refresh();
          });
      }}>
      <p>
        <input type="text" name="title" placeholder="title"></input>
      </p>
      <p>
        <textarea name="body" placeholder="body"></textarea>
      </p>
      <input type="submit" value="Create"></input>
    </form>
  );
};

export default Create;
