import Head from "next/head";
import React from "react";
import Title from "./Title";

export default function Page({ title, children }) {
  return (
    <>
      <Head>
        <title>{title} - Next-Shop</title>
      </Head>
      <main className="p-3">
        <Title>{title}</Title>
        {children}
      </main>
    </>
  );
}
