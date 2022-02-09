// client side with useEffect

import Head from "next/head";
import Title from "../components/Title";

export default function Home() {
  const products = [
    { id: 1, title: "First product" },
    { id: 2, title: "Second product" },
  ];
  return (
    <>
      <Head>
        <title>Next-Shop</title>
      </Head>
      <main className="p-3">
        <Title>Next Shop</Title>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.title}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
