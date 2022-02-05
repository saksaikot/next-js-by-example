import Head from "next/head";
import React from "react";
import { readFile } from "fs/promises";
export async function getStaticProps() {
  const data = await readFile("contents/posts/first-post.json", "utf-8");

  const post = JSON.parse(data);

  return {
    props: {
      ...post,
      // title: "My First Post",
      // body: "My first paragraph from getStaticProps",
    },
  };
}

export default function FirstPostPage({ title, body }) {
  console.log("[FirstPost page] rendered");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <h2>{title}</h2>
        <p>{body}</p>
      </main>
    </>
  );
}
