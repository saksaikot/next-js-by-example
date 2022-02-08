import Head from "next/head";
import Title from "../components/Title";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next-Shop</title>
      </Head>
      <main className="p-3">
        <Title>Next Shop</Title>
      </main>
    </>
  );
}
