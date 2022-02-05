import Head from "next/head";
import React from "react";
import { getPost } from "../../lib/posts";

export async function getStaticProps() {
  const post = await getPost("first-post");

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
        <article dangerouslySetInnerHTML={{ __html: body }} />
      </main>
    </>
  );
}
