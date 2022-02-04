import Head from "next/head";
import React from "react";

export default function AboutPage() {
  console.log("[About page] rendered");

  return (
    <>
      <Head>
        <title>About - My Blog</title>
      </Head>
      <main>
        <h2>About page</h2>
      </main>
    </>
  );
}
