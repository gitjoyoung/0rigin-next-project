"use client";

async function Read(props) {
  const resp = await fetch(`http://localhost:9999/topics/${props.params.id}`);
  const topic = await resp.json();
  console.log(topic);
  return (
    <section>
      <h1>글읽기</h1>
      <h2>{topic.title}</h2>
      {topic.body}
    </section>
  );
}

export default Read;
