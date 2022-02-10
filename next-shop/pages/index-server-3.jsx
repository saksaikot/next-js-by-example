// server side with getServerSideProps
import Head from "next/head";
import Title from "../components/Title";
import { getProducts } from "../lib/product";

export async function getServerSideProps() {
  console.log("[Homepage] [getServerSideProps]");
  const products = await getProducts();
  return {
    props: {
      products,
    },
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
