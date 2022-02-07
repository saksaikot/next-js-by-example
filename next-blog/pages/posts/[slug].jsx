import Head from "next/head";
import React from "react";
import { getPost, getSlugs } from "../../lib/posts";

export async function getStaticPaths() {
  const slugs = await getSlugs();
  return {
    paths: slugs.map((slug) => ({
      params: {
        slug,
      },
    })),
    // paths: [
    //   {
    //     params: {
    //       slug: "first-post",
    //     },
    //   },
    //   {
    //     params: {
    //       slug: "second-post",
    //     },
    //   },
    // ]
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  // console.log("[Post page] [getStaticProps-context]", context);
  const post = await getPost(slug);

  return {
    props: {
      ...post,
      // title: "My First Post",
      // body: "My first paragraph from getStaticProps",
    },
  };
}

export default function PostPage({ title, body, date }) {
  console.log("[Post page] rendered");

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <h2>{title}</h2>
        <p>Published {date}</p>
        <article dangerouslySetInnerHTML={{ __html: body }} />
      </main>
    </>
  );
}
