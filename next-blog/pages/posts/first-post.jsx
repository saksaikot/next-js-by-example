import Head from "next/head";
import React from "react";

export default function FirstPostPage() {
  console.log("[FirstPost page] rendered");

  return (
    <>
      <Head>
        <title>FirstPost - My Blog</title>
      </Head>
      <main>
        <h2>First Post</h2>
        <p>This is my first post in next.js</p>
      </main>
    </>
  );
}
