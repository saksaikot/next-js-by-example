import React from "react";
import Head from "next/head";
import Link from "next/link";
export default function index() {
  console.log("[Index page] rendered");
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <main>
        <h2>My blog</h2>
        <ul>
          <li>
            <Link href="/posts/first-post">
              <a>First-post</a>
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
}
