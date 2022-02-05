import Head from "next/head";
import React from "react";
export async function getStaticProps() {
  return {
    props: {
      title: "My First Post",
      body: "My first paragraph from getStaticProps",
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
