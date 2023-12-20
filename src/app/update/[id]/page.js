"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Update = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch("http://localhost:9999/topics/" + id)
      .then((resp) => resp.json())
      .then((result) => {
        setBody(result.body);
        setTitle(result.title);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    };

    fetch(`http://localhost:9999/topics/${id}`, options)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const lastId = result.id;
        router.push(`/read/${lastId}`);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <p>
        <input
          type="text"
          name="title"
          defaultValue={title}
          placeholder="title"
          onChange={(e) => e.target.value}></input>
      </p>

      <p>
        <textarea
          name="body"
          defaultValue={body}
          placeholder="body"
          onChange={(e) => setTitle(e.target.value)}></textarea>
      </p>
      <input type="submit" value="Update"></input>
    </form>
  );
};

export default Update;
