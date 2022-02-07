import React from "react";
import Head from "next/head";
import Link from "next/link";
import { getPosts } from "../lib/posts";

export async function getStaticProps() {
  const posts = await getPosts();

  return {
    props: { posts },
  };
}
export default function index({ posts }) {
  console.log("[Index page] rendered");

  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <main>
        <h2>My blog</h2>
        <ul>
          {posts.map(({ slug, title }) => (
            <li key={slug}>
              <Link href={`/posts/${slug}`}>
                <a>{title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
