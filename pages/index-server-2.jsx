// server side with getStaticProps and revalidation
import Head from "next/head";
import Title from "../components/Title";
import { getProducts } from "../lib/product";

export async function getStaticProps() {
  const products = await getProducts();
  return {
    props: {
      products,
    },
    revalidate: 30,
  };
}

export default function Home({ products }) {
  console.log("[Home] - products ", products);
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
