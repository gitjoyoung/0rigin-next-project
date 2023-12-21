"use client";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

export function Control() {
  const router = useRouter();

  const params = useParams();
  const id = params.id;
  console.log("params :" + id);
  return (
    <ul>
      <li>
        <Link href="/create">Create</Link>
      </li>
      {id ? (
        <>
          <li>
            <Link href={"/update/" + id}>Update</Link>
          </li>

          <li>
            <input
              type="button"
              value="delete"
              onClick={() => {
                const obtions = { method: "DELETE" };
                fetch("http://localhost:9999/topics/" + id, obtions)
                  .then((res) => res.json())
                  .then((result) => {
                    console.log(result);
                    router.push('/')
                  });
              }}></input>
          </li>
        </>
      ) : null}
    </ul>
  );
}
