import React from "react";
import Head from "next/head";
export default function index() {
  console.log("[Index page] rendered");
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <main>
        <h2>My blog</h2>
      </main>
    </>
  );
}
